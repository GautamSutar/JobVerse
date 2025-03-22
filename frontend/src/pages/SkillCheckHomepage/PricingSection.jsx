// src/components/SkillCheckHomepage/PricingSection.jsx
import React from "react";
import PricingCard from "./PricingCard";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple Pricing Plans
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that fits your interview preparation needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            tier="Basic"
            price="$9.99"
            features={[
              "5 mock interviews per month",
              "Basic resume analysis",
              "General interview questions",
              "Email support",
            ]}
            isPopular={false}
          />
          <PricingCard
            tier="Pro"
            price="$19.99"
            features={[
              "Unlimited mock interviews",
              "Advanced resume analysis",
              "Role-specific questions",
              "Progress tracking dashboard",
              "Priority support",
            ]}
            isPopular={true}
          />
          <PricingCard
            tier="Teams"
            price="$49.99"
            features={[
              "Everything in Pro",
              "5 user accounts",
              "Team performance analytics",
              "Custom question sets",
              "Dedicated account manager",
            ]}
            isPopular={false}
            buttonText="Contact Sales"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
