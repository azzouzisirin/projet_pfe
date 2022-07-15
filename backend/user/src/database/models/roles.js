const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
    ac.grant("visiteur")
    .readOwn("profile")

ac.grant("Étudiant")
.extend("visiteur")
 .updateOwn("profile")
 
ac.grant("Enseignant")
.extend("visiteur")
 .extend("Étudiant")
 .readAny("profile")
 
ac.grant("administrateur")
.extend("visiteur")
 .extend("Étudiant")
 .extend("Enseignant")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac;
})();