import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.service.js";

export const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume required" });
        }

        // multer is configured with memoryStorage, so the file is in req.file.buffer
        // (no disk write, nothing to read from a path, nothing to delete afterwards)
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