module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-min');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    typescript: {
      app: {
        src: ['app/scripts/Game.ts'],
        dest: 'build/js/game.js',
        options: {
          sourceMap: true
        }
      }
    },
    min: {
      js: {
        src: 'build/js/game.js',
        dest: 'build/js/game.min.js'
      }
    },
    copy: {
      app: {
        files: [
          {
            cwd: 'app',
            expand: true,
            src: ['**/*.html', 'assets/**/*'],
            dest: 'build/'
          }
        ]
      },
      bower: {
        files: [
          {
            'build/vendor/phaser.min.js': 'bower_components/phaser-official/build/phaser.min.js',
            'build/vendor/phaser.map': 'bower_components/phaser-official/build/phaser.map'
          }
        ]
      }
    },
    open: {
      app: {
        path: 'http://localhost:8080',
        options: {
          openOn: 'serverListening'
        }
      }
    },
    connect: {
      app: {
        options: {
          port: 8080,
          hostname: 'localhost',
          base: 'build',
          livereload: true
        }
      }
    },
    watch: {
      app: {
        files: 'app/**/*',
        tasks: ['typescript', 'copy', 'min'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['typescript', 'copy', 'min', 'open', 'connect']);
  grunt.registerTask('server', function () {
    var server = require('myServer');
    server.listen(3000, function (err) {
      if (!err) {
        grunt.log.writeln('Server started');
        grunt.event.emit('serverListening'); // triggers open:delayed
      }
    });
  });

}
