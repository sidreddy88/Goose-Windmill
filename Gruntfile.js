module.exports = function(grunt) {

	 grunt.initConfig({
	 	pkg: grunt.file.readJSON('package.json'),
	 	concat: {
      dist: {
        files: {
          'public/dist/production.js': 
             ['public/app/services/services.js',
              'public/app/auth/auth.js',
              'public/app/currentlyFollowing/currentlyFollowing.js',
              'public/app/personal/personal.js',
              'public/app/tabs/tabs.js',
              'public/app/topStories/topStories.js',
              'public/app/app.js'],
          'public/dist/production.css': ['public/**/*.css']
       },
     }
       },

    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    uglify: {
      build: {
        src:  'public/dist/production.js',
        dest: 'public/dist/production.min.js'
     }
    },

    cssmin: {
      css:{
        src: 'public/dist/production.css',
        dest: 'public/dist/production.min.css'
          }
    },

    jshint: {
      files: [
         'public/app/**/*.js', 'server/**/*.js', 
      ],
      options: {
        force: 'false',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },
    // this task needs to be run after concat (and before uglify) is called on any angular files, 
    ngAnnotate: {
        options: {
            add:true, 
        },
        dist: {
          files: {
                'public/dist/production.js': ['public/dist/production.js'],    
            }
        },    
    },

    watch: {
      scripts: {
        files: [
          'public/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'ngAnnotate',
          'uglify'
        ]
      },
      css: {
        files: 'public/**/*.css',
        tasks: ['cssmin']
      }
    },

     shell: {
        pull: {
            command: 'git pull --rebase upstream master'
        },
        push: {
            command: function(branch) {
             return 'git push origin ' + branch;
                }
            },
          },
        
   });

   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-nodemon');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-ng-annotate');
   grunt.loadNpmTasks('grunt-shell');

   grunt.registerTask('gitFunctions', 'Pull and push from github', function(n) {
     if (n){
       grunt.task.run('shell:pull');
       grunt.task.run('shell:push:' + n);
      }
   });

   grunt.registerTask('build', [
     'concat',
     'ngAnnotate',
     'cssmin',
  ]);
};