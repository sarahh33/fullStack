(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){"use strict";n.r(e);var c=n(2),o=n(15),r=n.n(o),a=n(6),i=n(4),u=n(3),s=n.n(u),l=n(0),j=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"make not important ":"make important";return Object(l.jsxs)("li",{className:"note",children:[e.content,Object(l.jsx)("button",{onClick:n,children:c})]})},f="http://localhost:3001/api/notes",b=function(){var t=s.a.get(f),e={id:1e4,content:"This note is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return t.then((function(t){return t.data.concat(e)}))},d=function(t){return s.a.post(f,t).then((function(t){return t.data}))},p=function(t,e){return s.a.put("".concat(f,"/").concat(t),e).then((function(t){return t.data}))},h=function(t){var e=t.message;return null===e?null:Object(l.jsx)("div",{className:"error",children:e})},m=function(){return Object(l.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(l.jsx)("br",{}),Object(l.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},O=function(){var t=Object(c.useState)([]),e=Object(i.a)(t,2),n=e[0],o=e[1],r=Object(c.useState)("a new note ..."),u=Object(i.a)(r,2),s=u[0],f=u[1],O=Object(c.useState)(!0),v=Object(i.a)(O,2),x=v[0],g=v[1],S=Object(c.useState)("some error happened"),k=Object(i.a)(S,2),w=k[0],y=k[1];Object(c.useEffect)((function(){b().then((function(t){o(t)}))}),[]),console.log("render",n.length,"notes");var N=x?n:n.filter((function(t){return!0===t.important}));return Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Notes"}),Object(l.jsx)(h,{message:w}),Object(l.jsx)("div",{children:Object(l.jsxs)("button",{onClick:function(){return g(!x)},children:["show ",x?"important":"all"]})}),Object(l.jsx)("ul",{children:N.map((function(t,e){return Object(l.jsx)(j,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),c=Object(a.a)(Object(a.a)({},e),{},{important:!e.important});p(t,c).then((function(e){o(n.map((function(n){return n.id!==t?n:e})))})).catch((function(c){y("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){y(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))}(t.id)}},e)}))}),Object(l.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:s,date:(new Date).toISOString,important:Math.random()<.5,id:n.length+1};d(e).then((function(t){o(n.concat(t)),f("")}))},children:[Object(l.jsx)("input",{value:s,onChange:function(t){console.log(t.target.value),f(t.target.value)}}),Object(l.jsx)("button",{type:"submit",children:"save"})]}),Object(l.jsx)(m,{})]})};n(39);r.a.render(Object(l.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.164374bf.chunk.js.map