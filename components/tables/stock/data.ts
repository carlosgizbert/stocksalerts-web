const columns = [
   {name: 'símbolo', uid: 'symbol', sortable: true},
   {name: 'limite mínimo', uid: 'lower_tunnel_limit', sortable: true},
   {name: 'limite máximo', uid: 'upper_tunnel_limit', sortable: true},
   {name: 'última notificação', uid: 'created_at', sortable: true},
   {name: 'modificar', uid: 'actions'},
];

const statusOptions = [
   {name: "Active", uid: "active"},
   {name: "Paused", uid: "paused"},
   {name: "Vacation", uid: "vacation"},
 ];

 export {
   columns,
   statusOptions
 }