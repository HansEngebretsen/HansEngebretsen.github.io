module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

       shell: {
        jekyllServe: {
          command: "jekyll serve --baseurl="
        },
        jekyllBuild: {
          command: "jekyll build --config _config.yml"
        }
       },

        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
                   src: [
                       // 'src/js/libs/*.js', // All JS in the libs folder
                       'src/js/*.js',
                       'src/js/modules/*.js'

                   ],
                   dest: '_site/js/production.js',
            }
          },

         uglify: {
            build: {
                src: '_site/js/production.js',
                dest: '_site/production.min.js'
            }
          },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/build/'
                }]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'file'
                },
                files: {
                    '_site/css/style.css': 'src/_sass/style.scss',
                    '_site/css/print.css': 'src/_sass/print.scss',
                    '_site/css/ie.css': 'src/_sass/ie.scss'
                }
            }
        },
         autoprefixer: {
            options: {
              browsers: ['last 3 versions', '> 5%','ie 8', 'ie 7','ie 9']
            },
            dist: {
                files: {
                    'css/style.css': 'css/style.css'
                }
            }

        },

       watch: {

            options: { livereload: true },
            scripts: {
              files: ['src/js/**/*.js'],
              tasks: ['concat', 'uglify'],
              options: {
                spawn: false,
              }
            },
            css: {
              files: ['src/_sass/**/**/**/*.scss'],
              tasks: ['sass', 'autoprefixer'],
              options: {
                spawn: false,
              }
            }
            // images: {
            //   files: ['img/**/*.{png,jpg,gif}', 'img/*.{png,jpg,gif}'],
            //   tasks: ['imagemin'],
            //   options: {
            //     spawn: false,
            //   }
            // }

        }



    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask("serve", ["shell:jekyllServe"]);
    grunt.registerTask('default', ['concat', 'sass', 'autoprefixer']);
};