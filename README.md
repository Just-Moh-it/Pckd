<div id="top"></div>

<!-- PROJECT Intro -->
<br />
<div align="center">
  <a href="https://github.com/Just-Moh-it/Pckd/stargazers">
    <img src="assets/Readme-assets/logo-4x.png" alt="Project Banner" height="100">
  </a>

  <p align="center">
    More than just a URL Shortener 😎
    <br />
    <a href="https://github.com/Just-Moh-it/Pckd"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.figma.com/file/CWmPgKuSWm6dvihp1XXTn1/Pckd-2?node-id=230%3A427">Design file on Figma</a>
    ·
    <a href="https://github.com/Just-Moh-it/Pckd/issues">Report Bug</a>
    ·
    <a href="https://github.com/Just-Moh-it/Pckd/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

# 💁 About The Project

<a href="https://projects.mohityadav.codes/#Pckd">
    <img src="assets/Readme-assets/banner.png" alt="Project Banner">
</a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Last Commit][last-commit-shield]][last-commit-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

Pckd is an full-customizable, open source, free-to-use, usable-design-focued, tracking-intensive URL Shortener with awesome features, and **supports**:

- Creating short urls (we call them 🔗 `pckd`s) from long ones with, or without an account
- Customize back-halfs on every 🔗 pckd
- Deploy to custom 🔌 URL and Infrastructure 💿
- Track 🕵️‍♂️ each and every click on a 🔗 pckd, and retrieve

  - 🌐 IP address (Spoof-resistant)
  - 🕸️ ISP Name
  - 🗺️ IP-Location
  - 💻 Device details like OS Version and Device Model
  - 🪟 Browser Name and including version

  It's Just crazy how powerful it is! 🤯

- Edit links after they're created
- Custom Loading/Redirecting Screen 💯
- [On Roadmap!] Quick Redirections in 150ms! 😱
- Fast, Reliable and Secure 🔐
- Secret Storage 👮 and handling using 💻 environment variables
- Built on Modern and Well-used Technologies like React, Graphql & NodeJS
- Use your own DBMS 🥳. Pckd is compatible with MySQL, PostgreSQL, MongoDB and [many more](https://www.prisma.io/docs/reference/database-reference/supported-databases)

This project was created to be the most powerful URL shortenter for the public, so no wonder it's so feature-rich

<p align="right">(<a href="#top">back to top</a>)</p>

## 📸 Screenshots

Here is a sneak peak of the application and it's visuals 😍:

<table>
    <tr>
        <td colspan="2">
            <img src="assets/Readme-assets/screenshots/dashboard.png" alt="Dashboard Page" />
            <br />
            <p align="center">Dashboard Page</p>
        </td>
    </tr>
    <tr>
        <td>
            <img src="assets/Readme-assets/screenshots/login.png" alt="Login Screen" />
            <br />
            <p align="center">Login</p></td>
        <td>
            <img src="assets/Readme-assets/screenshots/signup.png" alt="Signup" />
            <br />
            <p align="center">Signup</p></td>
    </tr>
    <tr>
        <td>
            <img src="assets/Readme-assets/screenshots/account.png" alt="Account Page" />
            <br />
            <p align="center">Account Page</p></td>
        <td>
            <img src="assets/Readme-assets/screenshots/reset.png" alt="Reset Password Screen" />
            <br />
            <p align="center">Reset Password</p></td>
    </tr>
    <tr>
        <td colspan="2">
            <img src="assets/Readme-assets/screenshots/home.png" alt="Home Page" />
            <br />
            <p align="center">Home Page</p>
        </td>
    </tr>
</table>

Want to create your own iteration? [View the designs on Figma](https://www.figma.com/file/CWmPgKuSWm6dvihp1XXTn1/Pckd-2?node-id=230%3A427)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Motivation -->

## 🤗 Motivation

After looking at all the `aka.ms` links out there which flood windows, along with the numerout times aving been prompted to buy premium plans from `bit.ly` while shortening my URLs, the decision of having a personal URL shortener hosted on a custom domain for free caught wind. Starting out by looking at GitHub for a JavaScript-based URL shortener, no one stood out and had minimal features. So, I decided to create my own URL shortener along with the help of a few friends, and got what this repository contains.

<p align="right">(<a href="#top">back to top</a>)</p>

## 😲 Built With (Tech Stack)

The following technologies were involved in the making of this project.

- [React Js](https://reactjs.org/) ⚛️ - For the frontend of the app
- [Apollo Graphql Server v3](https://www.apollographql.com/docs/apollo-server/) 🕸️ - For querying the backend from the frontend efficiently
- [Graphql Template By Mohit](https://github.com/Just-Moh-it/grapqhl-backend) 🧩 - Boilerplate Template used for initializing the backend
- [Prisma](https://www.prisma.io/) 💿 - The ORM used for the app
- Any 😨 relational or non-relational [database that prisma supports](https://www.prisma.io/docs/reference/database-reference/supported-databases)
- [Redux](https://redux.js.org/) 🗺️ w/ [Redux Toolkit](https://redux-toolkit.js.org/) - For handling states accross the application

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

# 🤯 Quick Start Guide

To get started with having your own instance of Pckd, follow the steps described in the following section

_**NOTE**_: Here are the [**DETAILED INSTRUCTIONS**](/docs/getting-started.md)

## 🌂 Prerequisites

You will need these to be already installed:

- [NodeJS](https://nodejs.org/) 14+ and [NPM](https://npmjs.com/)
- [A supported database system](https://www.prisma.io/docs/reference/database-reference/supported-databases)

And that's it

<p align="right">(<a href="#top">back to top</a>)</p>

## 💾 Installation

Follow these steps to get started with your own instance of Pckd

1. Clone the repo and `cd` to the folder base of this repo
1. Run command `npm run init` to install all the dependencies, and initialize environment files in both folders
1. Obtain a free api key from [IP Registry](https://ipregistry.co/) (for IP address tracking info lookups)
1. Create a database named pckd in your chosen DBMS and note down the connection Username and Password
1. Manually go to both the `client` and `server` folder and fill in the values in the `.env` file
1. Open the [`server/prisma/schema.prisma`](server/prisma/schema.prisma) file and replace `postgresql` with your chosen db name.
1. Return to the base direcotry and run `npm run dev` to test the app
1. To promote to production, run `npm run build-client` and then `npm start`

If you have any problems following the steps, [here are the detailed instructions](/docs/getting-started.md)

<p align="right">(<a href="#top">back to top</a>)</p>

# 🤩 Roadmap

This project is far from perfect, and we'll reach there one day, or at least get close. 

- [x] Add forgetten password-reset capabilites ([issue #3](/issues/3))
- [ ] Adding extra features such as enabling or disabling tracking on certain links ([Issue #2](/issues/2))
- [ ] Quick redirects using expressjs directly from the backend, wihtout loading react and redux (planned ~150ms)
- [ ] Adding docker-compose supported quick installation

Known Issues: 

- [ ] Hit not registered if IP not provided

See the [open issues](https://github.com/Just-Moh-it/Pckd/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

# 📐 How it works

Here's a diagram explaining exactly how everything fits into place

<div align="center">
<img src="assets/Readme-assets/data-diagram.png" height=300/>
<p>Here's how everything fits into the scene</p>
</div>

<!-- CONTRIBUTING -->

# 🙃 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

# 👋 Reach Out

You can reach out to Mohit Yadav, the main creator of the app (for now) at mail ([mohit@mohityadav.codes](mailto:mohit@mohityadav.codes)), [Twitter](https://twitter.com/Just_Moh_it) or [Discord](https://discord.gg/cqNbdEmazR)

<table>
  <tr>
    <td>
      <a href="https://discord.gg/cqNbdEmazR">
        <img src="assets/Readme-assets/reach-out/discord.png" alt="Join Discord Server" />
        <p align="center">If you Have any questions</p>
      </a>
    </td>
    <td>
      <a href="https://www.buymeacoffee.com/JustMohit">
        <img src="assets/Readme-assets/reach-out/coffee.png" alt="Buy me a coffee" />
        <p align="center">So I can keep on going</p>
      </a>
    </td>
    <td>
      <a href="https://mohityadav.codes">
        <img src="assets/Readme-assets/reach-out/website.png" alt="Visit website">
        <p align="center">Awesome projects</p>
      </a>
    </td>
  </tr>
</table>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

# 😋 License

Distributed under the MIT License. See [`LICENSE.txt`](/LICENSE.txt) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

# 😊 Acknowledgments

- [Parth Jadhav](https://github.com/ParthJadhav) for ideas and support
- [Respective Google Font](https://fonts.google.com) Creators
- [AR Shakir](https://dribbble.com/shots/15223174-Project-Management-Dashboard-UI-Exploration) - Inspiration for dashboard UI design

<p align="right">(<a href="#top">back to top</a>)</p>

# 🥰 Endnode

Just one last thing, if you have reached this far, why not consider giving a star to the repo like [many amazing people](/stargazers) already have. This keeps us going and we love to see that people like our projects, and motivates us to make more of these. With that, thank you loads 😊🥰
<p align="right">~ Mohit</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Just-Moh-it/Pckd.svg?style=flat-square&logo=github
[contributors-url]: https://github.com/Just-Moh-it/Pckd/graphs/contributors
[last-commit-shield]: https://img.shields.io/github/last-commit/Just-Moh-it/Pckd?style=flat-square&logo=anchor
[last-commit-url]: https://github.com/Just-Moh-it/Pckd/commit/main
[forks-shield]: https://img.shields.io/github/forks/Just-Moh-it/Pckd.svg?style=flat-square&logo=curseforge
[forks-url]: https://github.com/Just-Moh-it/Pckd/network/members
[stars-shield]: https://img.shields.io/github/stars/Just-Moh-it/Pckd.svg?style=flat-square&logo=Apache-Spark
[stars-url]: https://github.com/Just-Moh-it/Pckd/stargazers
[issues-shield]: https://img.shields.io/github/issues/Just-Moh-it/Pckd.svg?style=flat-square&logo=testing-library
[issues-url]: https://github.com/Just-Moh-it/Pckd/issues
[license-shield]: https://img.shields.io/github/license/Just-Moh-it/Pckd.svg?style=flat-square&logo=gmail
[license-url]: https://github.com/Just-Moh-it/Pckd/blob/master/LICENSE.txt
[logo]: assets/Readme-assets/logo-full.png
