import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

actor {
  type Quote = {
    text : Text;
    author : Text;
  };

  module Quote {
    public func compareByAuthor(quote1 : Quote, quote2 : Quote) : Order.Order {
      Text.compare(quote1.author, quote2.author);
    };
  };

  let browse = Map.empty<Text, List.List<Quote>>();

  public shared ({ caller }) func addQuote(author : Text, text : Text) : async () {
    let quote : Quote = { author; text };
    let quotes = switch (browse.get(author)) {
      case (null) {
        let list = List.empty<Quote>();
        browse.add(author, list);
        list;
      };
      case (?quotes) { quotes };
    };
    quotes.add(quote);
  };

  public query ({ caller }) func getAuthorQuotes(author : Text) : async [Quote] {
    switch (browse.get(author)) {
      case (null) { Runtime.trap("Author does not exist.") };
      case (?quotes) { quotes.toArray() };
    };
  };

  public query ({ caller }) func getQuotesSortedByAuthor() : async [Quote] {
    var flatArray : [Quote] = [];
    for (quotes in browse.values()) {
      flatArray := flatArray.concat(quotes.toArray());
    };
    flatArray.sort(Quote.compareByAuthor);
  };
};
