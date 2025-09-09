import React from "react";
import { CodeBlock } from "./ui/code-block";

export default function CodeQuote() {
  const code = `class Person {
    void grow(String challenge) {
        System.out.println("Learned from " + challenge);
    }

    void reflect() {
        System.out.println("Success isn't arriving somewhere—");
        System.out.println("it's becoming someone along the way.");
    }
}

public class Journey {
    public static void main(String[] args) {
        Person traveler = new Person();
        String[] challenges = { "failure", "uncertainty", "change" };

        for (String c : challenges) {
            traveler.grow(c);
        }

        traveler.reflect();
    }
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
          language="java"
          filename="Journey.java"
          code={code}
        />
      </div>
    </div>
  );
}
