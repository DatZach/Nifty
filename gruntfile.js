module.exports = function (grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        typescript: {
            js: {
                src: [ 'src/*.ts', 'src/**/*.ts' ],
                dest: 'build/<%= pkg.name %>.js',
                
                options: {
                    declaration: true
                }
            }
        },

        uglify: {
            build: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        copy: {
            files: {
                cwd: 'src/lib',
                src: '**/*.js',
                dest: 'build/lib',
                expand: true
            }
        },

        clean: {
            build: [
                'build'
            ],
            src: [
                'src/**/*.d.ts',
                '!src/lib/**/*.d.ts',
                'src/**/*.js'
            ]
        }
    });

    // Load task plugins
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task
    grunt.registerTask('default', [
        'typescript:js',
        'uglify',
        'copy'
    ]);
};
