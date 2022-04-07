#!/bin/bash
cd ~/workplace/eslweb/ || exit

rm -r -f ~/workplace/dev/esl_admin/*
rm -r -f ~/workplace/prod/esl_admin/*

cp -a -f cn_test_esl_admin/*  ~/workplace/dev/esl_admin/
cp -a -f cn_prod_esl_admin/*  ~/workplace/prod/esl_admin/