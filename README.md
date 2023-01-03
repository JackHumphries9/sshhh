<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/JackHumphries9/Socially">
    <img src="./sshhh_icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">sshhh</h3>

  <p align="center">
    Create secure secrets for any use case with one simple command.
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

-   [About the Project](#about-the-project)
-   [Built With](#built-with)
-   [Getting Started](#getting-started)
-   [Usage](#usage)
-   [Releases](#releases)
-   [Roadmap](#roadmap)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

I've had a need for quickly creating secrets for various use cases, for example, creating a secret for a new API key or a JWT secret. I've always used online tools or NodeJS, but I wanted a simple command line tool that I could use to create secrets for any use case.

(Icon by [Freepik](https://www.flaticon.com/free-icons/secret))

### Built With

-   [Commander.js](https://github.com/tj/commander.js)
-   [Chalk](https://github.com/chalk/chalk)
-   [Typescript](https://github.com/microsoft/TypeScript)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

Install the package globally with:

```sh
npm i -g sshhh
```

Then run the command to generate a secret:

```sh
sshhh
```

## Usage

By default, the command will generate a 256 byte secret encoded in Base64. You can change the length of the secret with the `-l` or `--length` flag. You can also change the encoding with the `-t` or `--type` flag.

The `-l` or `--length` flag accepts a number between 4 and 268,435,456 (this is due to the maximum string possible in JavaScript).

The `-t` or `--type` flag accepts the following values: `base64`, `hex`, `base64url`.

Example: For a 512 byte secret encoded in hex:

```sh
sshhh -l 512 -t hex
```

For more help type:

```sh
sshhh --help
```

## Releases

See the [releases](https://github.com/JackHumphries9/Socially/releases/) page for all releases and to download the binaries.

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/JackHumphries9/Socially/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the GNU General Public License v3.0 License. See `LICENSE` for more information.

## Contact

Jack Humphries - me@jackhumphries.io

Project Link: [https://github.com/JackHumphries9/sshhh](https://github.com/JackHumphries9/sshhh)

<!-- Website Link: [https://getsocially.app](https://getsocially.app) -->
