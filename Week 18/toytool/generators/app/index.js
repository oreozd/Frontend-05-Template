var Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    async initPackage() {
        let answer = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            }
        ])

        this.log("name", typeof answer.name)

        const pkgJson = {
            "name": answer.name,
            "version": "1.0.0",
            "description": "vue",
            "main": "generators/app/index.js",
            "scripts": {
                "test": "mocha --require @babel/register",
                "build": "webpack",
                "coverage": "nyc mocha"
            },
            "author": "",
            "license": "ISC",
            "dependencies": {
            }
        };
    
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(["vue"], { 'save-dev': false});
        this.npmInstall(["webpack", "vue-loader", "webpack-cli", "vue-template-compiler", "babel-loader",
            "vue-style-loader", "css-loader", "copy-webpack-plugin", "@babel/register", 
            "@babel/core", "babel/preset-env", "@istanbuljs/nyc-config-babel",
            "babel-plugin-istanbul", "mocha", "nyc"
        ]
        , { 'save-dev': true});
        this.fs.copyTpl(
            this.templatePath('HelloWorld.vue'),
            this.destinationPath('src/HelloWorld.vue')
        );

        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );

        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
        );

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            {title: answer.name} //传入名字
        );

        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc'),
            {}
        );

        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc'),
            {}
        );

        this.fs.copyTpl(
            this.templatePath('sampleTest.js'),
            this.destinationPath('test/sampleTest.js'),
            {}
        );
    }
};