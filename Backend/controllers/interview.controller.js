import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.service.js";
import User from "../model/user.model.js";
import Interview from "../model/inter.model.js";

export const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume required" });
        }

      
        const uint8Array = new Uint8Array(req.file.buffer);

        const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

        let resumeText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();

            const pageText = content.items.map(item => item.str).join(" ");
            resumeText += pageText + "\n";
        }

        resumeText = resumeText.replace(/\s+/g, " ").trim();

        const messages = [
            {
                role: "system",
                content: `
                Extract structured data from resume.

                Return strictly JSON, no markdown, no code fences, no extra text:

                {
                "role": "string",
                "experience": "string",
                "projects": ["project1", "project2"],
                "skills": ["skill1", "skill2"]
                }
                `
            },
            {
                role: "user",
                content: resumeText
            }
        ];

        const aiResponse = await askAi(messages);

        // strip ```json fences in case the model wraps the output
        const cleaned = aiResponse.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);

        res.json({
            role: parsed.role,
            experience: parsed.experience,
            projects: parsed.projects,
            skills: parsed.skills,
            resumeText
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const generateQuestion = async (req, res) => {

    try {
        const {role, experience, mode, resumeText, projects, skills} = req.body
        role = role?.trim();
        experience = experience?.trim();
        mode = mode?.trim();

        if(!role || !experience || !mode){
            return res.status(400).json({message: "Role, Exprience and Mode are required."})
        }

        const user = await User.findById(req.userId)

        if(!user) {
            return res.status(400).json({
                message: "User not found."
            });
        }
        if(user.credits < 50){
            return res.status(400).json({
                message: "Not enough credits. Minimum 50 required."
            })
        }

        const projectText = Array.isArray(projects) && projects.length ? projects.join(", ") : "None";

        const skillsText = Array.isArray(skills) && skills.length ? skills.join(", ") : "None";

        const safeResume = resumeText?.trim() || "None";

        userPrompt = `
        Role: ${role}
        Experience: ${experience}
        InterviewMode: ${mode}
        Projects: ${projectText}
        Skills:${skillsText}
        Resume:${safeResume}
        `;

        if(!userPrompt.trim()) {
            return res.status(400).json({
                message: "Prompt content is empty."
            })
        }


        const message = [
            {
                role: "system",
                content: `
        You are a real human interviewer conducting a professional interview.
        Speak in simple, natural English as if you are directly talking to the candidate.
        Generate exactly 10 interview questions.
        Strict Rules:
        - Each question must contain between 15 and 25 words.
        - Each question must be a single complete sentence.
        - Do NOT number them.
        - Do NOT add explanations.
        - Do NOT add extra text before or after.
        - One question per line only.
        - Keep language simple and conversational.
        - Questions must feel practical and realistic.
        Difficulty progression:
        Question 1 → easy  
        Question 2 → easy  
        Question 3 → medium  
        Question 4 → medium  
        Question 5 → hard  
        Question 6→ easy  
        Question 7 → easy  
        Question 8 → medium  
        Question 9 → medium  
        Question 10 → hard  
        Make questions based on the candidate’s role, experience,interviewMode, projects, skills, and resume details.
        `
              }
              ,
              {
                role: "user",
                content: userPrompt
              }
        ];

        const aiResponse = await askAi(message)

        if(!aiResponse || aiResponse.trim()) {
            return res.status(500).json({
                message: "AI return empty response"
            })
        }

        const questionsArray = aiResponse
        .split("\n")
        .map(q => q.trim())
        .filter(q => q.length > 0)
        .slice(0, 10);

        if(questionsArray.length === 0){
            return res.status(500).json({
                message: "AI failed to generate questions"
            });
        }

        user.credits -= 50;
        await user.save()

        const interview = await Interview.create({
            userId: user._id,
            role,
            exprience,
            mode,
            resumeText: safeResume,
            questions: questionsArray.map((q, index)=> ({
                question: q,
                difficulty: ["easy", "easy", "medium", "hard", "easy", "easy", "medium", "hard"][index],
                timeLimit: [60, 60, 90, 90, 120, 60, 60, 90, 90, 120] [index],
            }))
        })

        res.json({
            interviewId: interview._id,
            creditsLeft: user.credits,
            userName: user.name,
            questions: interview.questions
        });

    } catch (error) {
        return res.status(500).json({message: error})
    }
}