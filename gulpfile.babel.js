import gulp from 'gulp'
import {spawn} from 'child_process'
import hugoBin from 'hugo-bin'
import gutil from 'gulp-util'
import flatten from 'gulp-flatten'
import autoprefixer from 'autoprefixer'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import cssNano from 'gulp-cssnano'
import BrowserSync from 'browser-sync'
import webpack from 'webpack'
import webpackConfig from './webpack.conf'
import uglify from 'gulp-uglify'
import pump from 'pump'
import htmlmin from 'gulp-htmlmin'

const browserSync = BrowserSync.create()

// Hugo arguments
const hugoArgsDefault = ['-d', '../dist', '-s', 'site', '-v']
const hugoArgsPreview = ['--buildDrafts', '--buildFuture']

// Development tasks
gulp.task('hugo', (cb) => buildSite(cb))
gulp.task('hugo-preview', (cb) => buildSite(cb, hugoArgsPreview))

// Build/production tasks
gulp.task('compileSite', ['css', 'js', 'fonts', 'compressJS', 'compressHTML'], (cb) => buildSite(cb, [], 'production'))
gulp.task('build', ['compileSite'], () => minifyHtml())
gulp.task('compileSite-preview', ['css', 'js', 'fonts', 'compressJS', 'compressHTML'], (cb) => buildSite(cb, hugoArgsPreview, 'production'))
gulp.task('build-preview', ['compileSite-preview'], () => minifyHtml())

// Compile CSS
gulp.task('css', () => (
  gulp.src('./src/css/*.sass')
    .pipe(sass({
      outputStyle:  'nested',
      precision: 10,
      includePaths: ['node_modules'],
    }))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(cssNano())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
))

// Compile Javascript
gulp.task('js', (cb) => {
  const myConfig = Object.assign({}, webpackConfig)

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }))
    browserSync.reload()
    cb()
  })
})

// Compress JS
gulp.task('compressJS', ['js'], (cb) => {
  pump([
    gulp.src('dist/*.js'),
    uglify(),
    gulp.dest('dist')
  ],
  cb
  )
})

// Compress HTML
gulp.task('compressHTML', () => minifyHtml())

// Move all fonts in a flattened directory
gulp.task('fonts', () => (
  gulp.src('./src/fonts/**/*')
    .pipe(flatten())
    .pipe(gulp.dest('./dist/fonts'))
    .pipe(browserSync.stream())
))

// Development server with browsersync
gulp.task('server', ['hugo', 'css', 'js', 'fonts'], () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
  gulp.watch('./src/js/**/*.js', ['js'])
  gulp.watch('./dist/**/*.html', ['compressHTML'])
  gulp.watch('./src/css/**/*.sass', ['css'])
  gulp.watch('./src/fonts/**/*', ['fonts'])
  gulp.watch('./site/**/*', ['hugo'])
})

function minifyHtml() {
  return gulp.src('dist/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
}

/**
 * Run hugo and build the site
 */
function buildSite(cb, options, environment = 'development') {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault

  process.env.NODE_ENV = environment

  return spawn(hugoBin, args, {stdio: 'inherit'}).on('close', (code) => {
    if (code === 0) {
      browserSync.reload()
      cb()
    } else {
      browserSync.notify('Hugo build failed :(')
      cb('Hugo build failed')
    }
  })
}
