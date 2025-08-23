import React from "react";
import { CodeBlock } from "./ui/code-block";

export default function CodeQuote() {
  const code = `// The Journey of a Developer
template<typename T>
std::future<Success> cultivateGrowth(T& person) {
    return std::async(std::launch::async, [&person]() -> Success {
        while (person.isLearning) {
            auto& challenges = person.facing.obstacles;
            
            if (!challenges.empty()) {
                for (const auto& challenge : challenges) {
                    auto solution = person.solve(challenge);
                    person.wisdom += solution.learnings;
                }
                
                person.skills.enhance();
                person.perspective.broaden();
            }
            
            // Even small progress compounds over time
            person.growth = person.consistency * person.persistence;
        }
        
        // True success isn't measured by the destination, 
        // but by who you become on the journey
        return Success{
            person.accomplishments,
            person.growth,
            person.contributions.toWorld
        };
    });
}`;
  return (
    <div className="pt-10 mb-10 hidden md:block">
      <h1 className="text-3xl my-5 font-bold">
        Developer's Journey Algorithm
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        A deep dive into the algorithm that maps out the growth of a
        developer.
      </p>

      <div>
        <CodeBlock
          language="cpp"
          filename="DevJourneyAlgo.cpp"
          code={code}
        />
      </div>
    </div>
  );
}
