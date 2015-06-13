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
                       'js/libs/*.js', // All JS in the libs folder
                       'js/*.js'
                   ],
                   dest: 'js/build/production.js',
            }
          },

         uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
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
                    style: 'expanded'
                },
                files: {
                    'css/main.css': '_sass/main.scss'
                }
            }
        },
         autoprefixer: {
            options: {
              browsers: ['last 3 versions', '> 5%','ie 8', 'ie 7','ie 9']
            },
            dist: {
                files: {
                    'css/main.css': 'css/main.css'
                }
            }

        },

       watch: {

                  options: { livereload: true },
            scripts: {
              files: ['js/*.js'],
              tasks: ['concat', 'uglify'],
              options: {
                spawn: false,
              }
            },
            css: {
              files: ['_sass/**/*.scss'],
              tasks: ['sass', 'autoprefixer'],
              options: {
                spawn: false,
              }
            },
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
    grunt.registerTask('default', ['watch'], 'shell:jekyllBuild');
};