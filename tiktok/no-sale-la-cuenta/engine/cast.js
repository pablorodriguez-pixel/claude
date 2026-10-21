// Reparto del canal: helpers para meta.js (JSON-friendly)
exports.host=(acts,o={})=>({look:'host',talk:true,at:[o.x??160,o.y??1090],sc:o.sc??1,acts,...(o.extra||{})});
exports.actor=(look,at,acts,o={})=>({look,at,acts,sc:o.sc??1,talk:!!o.talk,flip:o.flip,...(o.extra||{})});
