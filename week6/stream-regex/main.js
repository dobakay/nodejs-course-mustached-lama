var RegExStream = require('./streams');


var regexStream = new RegExStream( );


regexStream.on('readable', function () {
    var content = null;

    while( content = this.read() ) {
        console.log(content.toString('utf'));
    }
});


"How funky is your chicken? How loose is your goose?".match( /.{1,3}/gi )
    .forEach(
        function( chunk ) {

            regexStream.write( chunk, "utf8" );

        }
    )
;

// Close the write-portion of the stream to make sure the last write() gets flushed.
regexStream.end();
