let contacts = [];

function addContact() {
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");

  if (!nameInput.value || !phoneInput.value) {
    alert("Please enter a name and phone number.");
    return;
  }

  const newContact = {
    name: nameInput.value,
    phone: phoneInput.value,
  };

  // Check for duplicate phone number
  const duplicateContact = contacts.find(
    (contact) => contact.phone === newContact.phone
  );

  if (duplicateContact) {
    alert("A contact with this phone number already exists.");
    return;
  }

  contacts.push(newContact);

  renderContacts();
  nameInput.value = "";
  phoneInput.value = "";
}

function editContact(index) {
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");

  nameInput.value = contacts[index].name;
  phoneInput.value = contacts[index].phone;

  // Remove the edited contact from the list
  contacts.splice(index, 1);

  renderContacts();
}

function deleteContact(index) {
  contacts.splice(index, 1);
  renderContacts();
}

function filterContacts() {
  const filterInput = document.getElementById("filter");
  const searchTerm = filterInput.value.toLowerCase();

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.phone.toLowerCase().includes(searchTerm)
  );

  renderContacts(filteredContacts);
}

function renderContacts(filteredContacts = null) {
  const contactsList = document.getElementById("contacts");

  contactsList.innerHTML = "";

  contacts.sort((a, b) => a.name.localeCompare(b.name));

  const displayContacts = filteredContacts || contacts;

  displayContacts.forEach((contact, index) => {
    const contactItem = document.createElement("li");
    contactItem.classList.add(
      "border-b-2",
      "py-2",
      "flex",
      "justify-between",
      "items-center"
    );
    const contactSpan = document.createElement("span");
    contactSpan.classList.add("text-lg", "font-medium");
    contactSpan.innerText = `${contact.name} - ${contact.phone}`;

    const editButton = document.createElement("button");
    editButton.classList.add(
      "mx-2",
      "bg-blue-500",
      "hover:bg-blue-700",
      "text-white",
      "font-bold",
      "py-1",
      "px-2",
      "rounded",
      "focus:outline-none",
      "focus:shadow-outline"
    );
    editButton.innerText = "Edit";
    editButton.addEventListener("click", () => editContact(index));

    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
      "bg-red-500",
      "hover:bg-red-700",
      "text-white",
      "font-bold",
      "py-1",
      "px-2",
      "rounded",
      "focus:outline-none",
      "focus:shadow-outline"
    );
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => deleteContact(index));
    const btnDiv = document.createElement("div");
    btnDiv.appendChild(editButton);
    btnDiv.appendChild(deleteButton);

    contactItem.appendChild(contactSpan);
    contactItem.appendChild(btnDiv);

    contactsList.appendChild(contactItem);
  });
}

renderContacts();
