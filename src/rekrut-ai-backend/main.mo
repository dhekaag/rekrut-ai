actor {
  public query func greeting(name : Text) : async Text {
    return "Halo, " # name # "!";
  };

};
