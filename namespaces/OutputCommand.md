---
title: OutPutCommand
author: Barry
date: 2019-01-09 2:31PM
---

```command
  tsc --outFile index.js circleMath.ts rectangleMath.ts index.ts
```

- this command bundle all namespaces in single app.js
- only one script index.js will be imported
- downside is you always list namespaces file you want to bundle together
- To escape from that command put these paths of namespaces on the heading line of the main file:

```typescript
  // never forget reference paths and its order if you want to bundle together your namespaces
  /// <reference path="circleMath.ts" />
  /// <reference path="rectangleMath.ts" />
```

- and then command

```command
  tsc index.ts --outFile index.js
```
