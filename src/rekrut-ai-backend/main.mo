import Text "mo:base/Text";
actor {
  public query func greeting(name : Text) : async Text {
    return "Halo, " # name # "!";
  };

  public query func interview_options(job : Text, topic : Text) : async Text {
    return "Creating question for, " # job # " with topic " # topic # "!";
  };

};
