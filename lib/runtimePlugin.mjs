var a="html demo",p="An auto-generated html demo by dumi",m=(t,e,n,i)=>/<!doctype html>/i.test(n)?n:`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${e}" />
        <title>${t}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.4/font/bootstrap-icons.min.css">
    </head>
    <body>
        <div id="app">
          ${n}
        </div>
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"><\/script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js"><\/script>
    </body>
</html>
`;function d({asset:t,title:e=a,description:n=p}){let i={},r="";return Object.entries(t.dependencies).forEach(([o,{type:c,value:l}])=>{c==="FILE"&&(r=l);}),i["package.json"]={content:JSON.stringify({name:"html-demo",version:"0.0.0",description:"An auto-generated html demo by dumi",main:"index.html",scripts:{start:"http-server -p 8000"},dependencies:{"http-server":"14.1.1"}}),isBinary:!1},i["index.html"]={content:m(e,n,r),isBinary:!1},i}function u(t,e){let{title:n,description:i}=e,s={title:n||a,description:i,template:"node",files:{},dependencies:{}};console.log("222----",t,"333",e);let r=d(e);return console.log("444----",r),s.files=Object.entries(r).reduce((o,[c,l])=>(o[c]=l.content,o),{}),Object.assign(t,s),console.log("666----",t,"777",e),t}function g(t,e){return Object.assign(t,{files:d(e)}),t}export{g as modifyCodeSandboxData,u as modifyStackBlitzData};