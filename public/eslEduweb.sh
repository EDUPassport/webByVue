#!/bin/bash
cd ~/workplace/eslweb/ || exit

rm -r -f ~/workplace/dev/esl_web/*
rm -r -f ~/workplace/prod/esl_web/*

cp -a -f devEduCN/*  ~/workplace/prod/esl_web/
cp -a -f distEduCN/*  ~/workplace/dev/esl_web/