# Geabaire

[![OpenAAC](https://www.openaac.org/images/OpenAAC-chat-red.svg)](https://www.openaac.org/advocates.html)
[![Status Badge](https://img.shields.io/badge/status-alpha-236b88)](https://aac.paradaux.io)
[![Status Badge](https://img.shields.io/badge/deployed%20with-cloudflare%20pages-F6821F)](https://aac.paradaux.io)

This project serves to be an alternative version of another Open Source project, CoughDrop that is free as in freedom rather than free as in beer. The project is licensed under AGPLv3 to ensure the products of this project are not used for malicious commercial purposes. 

Currently, the project exists as a rough-and-dirty implementation of the [Open Board Format](https://www.openboardformat.org/) as part of the wider OpenAAC project lead by the CoughDrop maintainers. 

**A live deployment of the `main` branch can be accessed in the form of a compiled `react-native-api` project here:** https://aac.paradaux.io

Mobile beta to follow in a few months time. 

## What's our why?

Alternative and Augmentative communication tools are incredibly important tools for day to day communication for certain individuals, and these tools are predomoninantly anglospheric in that their development is focused on the English Speaking world. Completely disregarding minority languages, especially on the part of the major commercial AAC tools.

This project is intended to be entirely localisable, with support for user-specified synthesisers. It was designed for use with the [Abair](https://abair.ie) Irish language synthesisers. 

It is being designed for a hybrid online-offline approach, where (dependent on availablity) synthesisers, and checks are implemented. Boards are read in from OBF Format, there is currently no plans to create a modelling system, for this you can use CoughDrop or another OBF editor if available. 

> This repository is part of the wider [Abair project](https://www.tcd.ie/research/start/abair.php). Development is funded by [COGG](https://www.cogg.ie) and the [Department of Tourism, Culture, Arts, Gaeltacht, Sport and Media.](https://www.gov.ie/en/organisation/department-of-tourism-culture-arts-gaeltacht-sport-and-media)

## Development / Details

This is a React Native application which is built upon the Expo Framework. Please see their documentation for getting setup with Expo, and be sure to install our dependencies (NPM & Expo-specific) using 

```bash
$ npx expo install
```

You may also wish to use an Android Emulator, if you wish to test the Android Tablet functionality however this requires Additional software, specifically Android Studio and a sufficiently powerful computer to run the Emulator. 

In order to run a clone locally you will need to either locally host [Supabase](https://supabase.com) or create an account on their platform. As well as that, you will need a working deployment of [openaac_api](https://github.com/phonlab-tcd/openaac_api) which supplements the PostgREST interface provided by Supabase as well as done the OBF conversion to our modified board format. It may also contain additional functionality in the future. 

Alternatively, this project currently supports `react-native-web` so you should be able to use the project in the web view as well which has a deployed copy of the openaac_api as well as the latest version of openaac_viewer. 

This availablity of this trial platform is neither guarenteed nor supported by Abair. It is used as a development platform as well as for use in public demos.

![](https://s3-eu-west-1.amazonaws.com/govieassets/89203/167d92e6-a9b9-4381-91ac-a408cab9c805.png)
![](https://www.cogg.ie/wp-content/themes/cogg/images/logo_website_small.png)


https://coolors.co/palette/590d22-800f2f-a4133c-c9184a-ff4d6d-ff758f-ff8fa3-ffb3c1-ffccd5-fff0f3