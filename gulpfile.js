var fileinclude = require('gulp-file-include'),
    gulp = require('gulp');

gulp.task('fileinclude', function() {
    gulp.src(['html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});

var rev = require('gulp-rev-ayou');
var revCollector = require('gulp-rev-collector-ayou');

gulp.task('manifest', function () {
    return gulp.src(['css/*.css','images/**/*','js/**/*'])
        .pipe(rev())                    //- 文件名加MD5后缀
        .pipe( rev.manifest() )         //- 生成一个rev-manifest.json
        .pipe( gulp.dest( 'rev' ) );    //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('rev',['manifest'],function() {console.log(111);
    gulp.src(['rev/rev-manifest.json', 'index.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('./'));                     //- 替换后的文件输出的目录
});

gulp.watch('css/**/*',['rev','fileinclude']);
gulp.task('default', [ 'rev','fileinclude']);