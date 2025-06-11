#!/bin/bash
cd /home/kavia/workspace/code-generation/kollywood-quiz-challenge-38620-13b8a377/kollywood_quiz_challenge
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

