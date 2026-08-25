import React, { useState } from "react";
import { motion } from "motion/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState("free");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description:
        "Perfect for beginners starting interview preparation",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description:
        "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description:
        "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const handlePayment = (plan) => {
    console.log("Proceeding to payment:", plan);

    // Payment logic will come here
    // Example:
    // navigate("/payment", { state: { plan } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-16">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-14 flex items-start gap-4">
        <button
          onClick={() => navigate("/")}
          className="mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>

        <div className="text-center w-full">
          <h1 className="text-4xl font-bold text-gray-800">
            Choose Your Plan
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Flexible pricing to match your interview preparation goals.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              whileHover={
                !plan.default
                  ? { scale: 1.05 }
                  : {}
              }
              className={`relative rounded-3xl p-8 transition-all duration-300 border ${
                isSelected
                  ? "border-blue-600 shadow-2xl bg-white"
                  : "border-gray-200 bg-white shadow-md"
              }`}
            >

              {/* Badge */}
              {plan.badge && (
                <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}

              {/* Plan Name */}
              <h2 className="text-2xl font-bold text-gray-800">
                {plan.name}
              </h2>

              {/* Price */}
              <div className="mt-4">
                <span className="text-4xl font-bold text-blue-600">
                  {plan.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-500 mt-4 min-h-[48px]">
                {plan.description}
              </p>

              {/* Credits */}
              <p className="mt-4 font-semibold text-gray-700">
                {plan.credits} Credits
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3 min-h-[140px]">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-gray-600"
                  >
                    ✓ {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <div className="mt-8">

                {isSelected ? (
                  <button
                    onClick={() => {
                      if (!plan.default) {
                        handlePayment(plan);
                      }
                    }}
                    disabled={plan.default}
                    className={`w-full py-3 rounded-xl font-semibold transition ${
                      plan.default
                        ? "bg-gray-200 text-gray-500 cursor-default"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {plan.default
                      ? "Selected"
                      : "Proceed to Pay"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
                  >
                    Select
                  </button>
                )}

              </div>

            </motion.div>
          );
        })}

      </div>
    </div>
  );
}

export default Pricing;