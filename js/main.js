require(["protobuf"], function(ProtoBuf) {
  console.log("Hello.");

  ProtoBuf.loadProtoFile("/proto/antidote.proto", function(err, builder) {
    console.log("Protocol buffer file loaded.")
  });
});
