module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks("grunt-contrib-stylus");
    grunt.loadNpmTasks("grunt-jslint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.initConfig({

        stylus: {
            compile: {
                files: {
                    'app/development/css/global.css': 'app/css/global.styl'
                }
            }
        },
        jade: {
            compile: {
                files: [
                    {
                        expand: true,
                        src: "*.jade",
                        dest: 'app/development/',
                        cwd: 'app/views',
                        ext: '.html'
                    }
                ]
            }
        },
        jslint: {
            src: ['app/development/script/**/*.js']
        },
        uglify: {
            my_target: {
                files: {
                    'app/development/script/TMS1_Presskit.min.js': 'app/development/script/TMS1_Presskit.min.js'
                }
            }
        },
        concat: {
            options: {
                separator: ' '
            },
            dist: {
                src: ['app/development/script/app/classes/*.js', 'app/development/script/app/**/*.js', 'app/development/script/app/startup.js'],
                dest: 'app/development/script/TMS1_Presskit.min.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/development/',
                        src: ['css/*.css', 'img/**/*', 'script/**/*.min.js', 'downloads/**/*', 'vendor/**/*.min.js', '*.html'],
                        dest: 'app/production'
                    }
                ]
            }
        },
        watch: {
            css: {
                files: ['app/css/*.styl'],
                tasks: ['stylus'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['app/views/*.jade'],
                tasks: ['jade'],
                options: {
                    spawn: false
                }
            },
            script: {
                files: ['app/development/script/**/*.js', '!app/development/script/TMS1_Presskit.min.js'],
                tasks: ['concat'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask("Compile CSS", "stylus");
    grunt.registerTask("Compile HTML", "jade");
    grunt.registerTask("Validate JS", "jslint");
    grunt.registerTask("Merge JS", "concat");
    grunt.registerTask("Uglify JS", ["concat", "uglify"]);
    grunt.registerTask("Deploy", ["stylus", "jade", "concat", "uglify", "copy"]);
    grunt.registerTask("Watch Compilers", "watch");
};