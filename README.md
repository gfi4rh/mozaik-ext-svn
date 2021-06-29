# Mozaïk SVN widgets

## SVN — Commits

> Montre les détails des 5 derniers commits

### parameters

key        | required | description
-----------|----------|----------------------------------------------------
`title`    | yes      | *Title of the widget*
`url`      | yes      | *URL de l'hôte SVN*
`project`  | yes      | *Nom du projet sous SVN*

### usage

```javascript
{
  type: 'svn.commits',
  title : "Commit",
  url : "http://domain-svn.com",
    project : "myProject"
  columns: 4, rows: 1,
  x: 0, y: 2
}
```
