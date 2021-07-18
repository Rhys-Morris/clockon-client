const mockClients = [
  {
    name: "Client Agency",
    contact: "George Takei",
    email: "georgetakei@gmail.com",
  },
  {
    name: "Client People",
    contact: "Woody Harrleson",
    email: "woody@gmail.com",
  },
  {
    name: "Work Hard",
    contact: "Bob Bobby",
    email: "bob@gmail.com",
  },
  {
    name: "Test Agency",
    contact: "George Takei",
    email: "georgetakei@gmail.com",
  },
  {
    name: "Chantry People",
    contact: "Woody Harrleson",
    email: "woody@gmail.com",
  },
  {
    name: "Calm Down",
    contact: "Bob Bobby",
    email: "bob@gmail.com",
  },
];

const mockProjects = [
  {
    id: 1,
    color: "#00ff00",
    name: "New Project1",
    client: "Mock",
    dueDate: "25-12-2021",
    billable: true,
    active: true,
    hoursLogged: 24,
  },
  {
    id: 2,
    color: "#ffff00",
    name: "New Project2",
    client: "Mock",
    dueDate: "25-12-2021",
    billable: false,
    active: true,
    hoursLogged: 24,
  },
  {
    id: 3,
    color: "#00ffff",
    name: "New Project1",
    client: "Mock",
    dueDate: "25-12-2021",
    billable: true,
    active: false,
    hoursLogged: 24,
  },
];

export { mockClients, mockProjects };
