String.prototype.trim = String.prototype.trim || function() {
	return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.morphURL = function() {  
  return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) { 
    return url.link(url); 
  }); 
};

String.prototype.morphUser = function() {  
  return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(user) { 
    var userHandler = user.replace("@","");
    return user.link("http://twitter.com/"+userHandler); 
  });
};

String.prototype.morphHashtag = function() {  
  return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(hashtag) { 
    var hashtagHandler = hashtag.replace("#","%23");
    return hashtag.link("http://search.twitter.com/search?q="+hashtagHandler); 
  });
};