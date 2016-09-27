require(["require", "protobuf", "bytebuffer"], function(require) {
  var ProtoBuf = require("protobuf");
  var ByteBuffer = require("bytebuffer");

  ProtoBuf.loadProtoFile("/proto/antidote.proto", function(err, builder) {
    var Antidote = builder.build("Antidote");
    var API = Antidote.API;

    // Timestamp functions.
    var Timestamp = {
      generate: function() {
        return new ByteBuffer()
                  .writeIString("Hello world!")
                  .flip();
      }
    };

    // Encode transaction descriptions.
    var TransactionDescriptor = {
      encode: function(transaction_descriptor) {
        return new ByteBuffer()
                  .writeIString(transaction_descriptor)
                  .flip();
      }
    }

    // Transaction functions.
    var Transaction = {
      start: function(timestamp) {
        var timestamp = Timestamp.generate();
        var startTransaction = new Antidote.API.ApbStartTransaction({
          "timestamp": timestamp
        });
        return startTransaction.encode();
      },

      abort: function(transaction_descriptor) {
        var abortTransaction = new Antidote.API.ApbAbortTransaction({
          "transaction_descriptor": TransactionDescriptor.encode(transaction_descriptor)
        });
        return abortTransaction.encode();
      },

      commit: function(transaction_descriptor) {
        var commitTransaction = new Antidote.API.ApbCommitTransactions({
          "transaction_descriptor": TransactionDescriptor.encode(transaction_descriptor)
        });
        return commitTransaction.encode();
      }
    };

  });

});
