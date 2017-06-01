/*
  ==========
  Main Grunt Build Configuration file

  This file is the main configuration object for the Grunt
  task runner.

  GruntJS: http://gruntjs.com/
  ==========
*/

module.exports = function(grunt) {
  /* ====================
   Load the NPM tasks from the package.json automatically.
   ==================== */
  require('load-grunt-tasks')(grunt);


  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /* --------------------
        Concat task
       --------------------  */
    concat: {
      // 2. Configuration for concatinating files goes here.
      dist: {
        src: [
          'js/main.js',
          'js/modules/*.js'

        ],
        dest: 'js/production.js',
      }
    },

    /* --------------------
        uglify task
       --------------------  */
    uglify: {
      build: {
        src: 'js/production.js',
        dest: 'js/production.min.js'
      }
    },

    /* --------------------
        Imagemin task
       --------------------  */
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          src: ['img/**/*.{png,jpg,gif}'],
          dest: '_site/img/'
        }]
      }
    },

    /* --------------------
        BrowserSync task
       --------------------  */
    browserSync: {
      bsFiles: {
        src: [
          '_site/css/*.css',
          '_site/js/*.js'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "_site"
        }
      }
    },

    /* --------------------
        Sass task
       --------------------  */
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceComments: 'true',
          sourcemap: 'file'
        },
        files: {
          'css/style.css': '_sass/style.scss'
        }
      }
    },

    /* --------------------
        autoprefixer task
       --------------------  */
    autoprefixer: {
      options: {
        browsers: ['last 3 versions', '> 5%', 'ie 8', 'ie 7', 'ie 9']
      },
      dist: {
        files: {
          'css/style.css': 'css/style.css'
        }
      }

    },

    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['_sass/**/**/**/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
          spawn: false,
        }
      }
    }
  });



  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['concat', 'sass', 'uglify', 'autoprefixer']);
  grunt.registerTask('watchs', ['browserSync', 'watch']);
};