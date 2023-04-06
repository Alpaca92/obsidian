```dataview
TABLE category, type, created
FROM "References"
WHERE inclusion != false
SORT created DESC
```
