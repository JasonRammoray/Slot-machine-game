# New game
* Method: POST
* Url: /api/game
* Request body: empty
* Response abstract: `{values: Array<Integer>, outcome: String, bonus: Boolean}`
* Response example:
```
{
    values: [1, 2, 3],
    outcome: 'No Win',
    bonus: true
}
```
