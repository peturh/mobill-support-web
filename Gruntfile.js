module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        src:{

            lessWatch : ['src/less/**/*.less'],
            less : ['src/less/stylesheets.less'],
            templates : ['src/parts/*.html', 'src/index.html']
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/js/app.js','src/templates/templates.js','src/js/vendors/spin.js', 'src/js/vendors/ladda.js','src/js/vendors/ladda.jquery.js', 'src/js/vendors/*.js', 'src/js/services/*.js', 'src/js/controllers/*.js', 'src/js/directives/*.js', 'src/js/vendors/angular-ladda.js' ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                compress: {
                    drop_console : true
                }
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'src/**/*.js',
                '!src/js/vendors/*'
            ],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files:['<%= src.lessWatch %>','<%= jshint.files %>','<%= src.templates %>'],
            tasks: ['jshint','less:build','targethtml:dev','html2js']
        },
        targethtml: {
            dist: {
                files: {
                    'dist/index.html': 'src/index.html'
                }
            },
            dev: {
                files: {
                    'src/errorfreeindex.html': 'src/index.html'
                }
            }
        },
        less: {
            dist: {
                options: {
                    compile: true,
                    compress: true
                },
                files: {
                    'dist/main.css': 'src/less/stylesheets.less'
                }
            },
            build : {
                options:{
                    compile:true
                },
                files: {
                    'src/main.css' : 'src/less/stylesheets.less'
                }
            }
        },
        html2js: {
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: ['src/parts/*.html'],
                dest: 'src/templates/templates.js'
            }
        },
        copy:{

            main : {
                files : [
                    {
                        cwd: 'src/',
                        expand: true,
                        src: ['img/**','manifest.json'],
                        dest: 'dist/'
                    },
                    {
                        cwd: 'src/',
                        expand: true,
                        src: ['tickets.html'],
                        dest: 'dist/src/'
                    }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'mobill-support-web-<%= pkg.version %>.tar.gz'
                },
                files: [

                    {src: ['dist/**'], dest: 'mobill-support-web-<%= pkg.version %>/'},
                    {src: ['package.json'], dest: 'mobill-support-web-<%= pkg.version %>/'},
                    {src: ['supportserver.js'], dest: 'mobill-support-web-<%= pkg.version %>/'},
                    {src: ['my_modules/**'], dest: 'mobill-support-web-<%= pkg.version %>/'},
                    {src: ['Gruntfile.js'], dest: 'mobill-support-web-<%= pkg.version %>/'}

                ]
            }
        }
    });

    grunt.registerTask('mavenpom', function () {
        var pkg = grunt.file.readJSON('package.json');
        grunt.log.writeln('Determined project version: ' + pkg.version);

        var pom = '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<project xmlns="http://maven.apache.org/POM/4.0.0"' +
            ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
            ' xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
            '  <modelVersion>4.0.0</modelVersion>\n' +
            '  <groupId>se.mobill.support</groupId>\n' +
            '  <artifactId>mobill-support-web</artifactId>\n' +
            '  <packaging>pom</packaging>\n' +
            '  <version>' + pkg.version + '</version>\n' +
            '  <build>\n' +
            '    <plugins>\n' +
            '      <plugin>\n' +
            '        <groupId>org.codehaus.mojo</groupId>\n' +
            '        <artifactId>build-helper-maven-plugin</artifactId>\n' +
            '        <version>1.8</version>\n' +
            '        <executions>\n' +
            '          <execution>\n' +
            '            <id>attach-artifacts</id>\n' +
            '            <phase>package</phase>\n' +
            '            <goals>\n' +
            '              <goal>attach-artifact</goal>\n' +
            '            </goals>\n' +
            '            <configuration>\n' +
            '              <artifacts>\n' +
            '                <artifact>\n' +
            '                  <file>mobill-support-web-' + pkg.version +'.tar.gz</file>\n' +
            '                   <type>tar.gz</type>\n' +
            '                </artifact>\n' +
            '              </artifacts>\n' +
            '            </configuration>\n' +
            '          </execution>\n' +
            '        </executions>\n' +
            '      </plugin>\n' +
            '    </plugins>\n' +
            '  </build>\n' +
            '</project> ';

        grunt.log.writeln('Writing deploy/pom.xml');
        grunt.file.write('pom.xml', pom);
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-html2js');


    grunt.registerTask('default', [
        'jshint',
        'concat',
        'uglify',
        'targethtml',
        'less:dist',
        'copy',
        'compress',
        'mavenpom'
    ]);

};
