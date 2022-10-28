let employeeData_js1 = []
let employeeMap = new Map();
let departments = [];
let departmentsMap = new Map();
let uniqueDepartments = [];

// display data
$.getJSON('./data/employeeData_js1.json', function (data) {
    employeeData_js1 = data
    // Create a map to save the data
    function createMap(employeeData_js1) {
        // employeeData_js1.forEach(function (employee) {
        for (let employee of employeeData_js1) {
            employeeMap.set(parseInt(employee.id), new employeeObj(employee.id, employee.first_name, employee.last_name, employee.email, employee.phone, employee.gender, employee.position, employee.department, employee.salary));
            departments.push(employee.department);
        }
        // delete duplicate in departments
        for (let i = 0; i < departments.length; i++) {
            if (!departmentsMap.has(departments[i])) {
                uniqueDepartments.push(departments[i]);
                departmentsMap.set(departments[i], true);
            }
        }

        // display select options
        let select = $('#filter');
        uniqueDepartments.forEach(function (department) {
            select.append(`<option value="${department}">${department}</option>`);
        });
    };

    createMap(employeeData_js1);

    // Display the data
    displayData(employeeMap);
});

// Create an object to store the data
let employeeObj = function (id, first_name, last_name, email, phone, gender, position, department, salary) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.gender = gender;
    this.position = position;
    this.department = department;
    this.salary = salary;
    this.displayObj = function () {
        let tbody = $('#main tbody');
        let tr = $('<tr>');
        let td1 = $('<td>').text(this.id);
        let td2 = $('<td>').text(this.first_name);
        let td3 = $('<td>').text(this.last_name);
        let td4 = $('<td>').text(this.email);
        let td5 = $('<td>').text(this.phone);
        let td6 = $('<td>').text(this.gender);
        let td7 = $('<td>').text(this.position);
        let td8 = $('<td>').text(this.department);
        let td9 = $('<td>').text(this.salary);
        let editBtn = $('<button>').text('Edit')
        editBtn.addClass('editBtn')
        let tdEdit = $('<td>').append(editBtn);
        let deleteBtn = $('<button>').text('Delete')
        deleteBtn.addClass('deleteBtn')
        let tdDelete = $('<td>').append(deleteBtn);
        tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9, tdEdit, tdDelete);
        tbody.append(tr);
    }
}

function index() {
    $('.editBtn').click(function (event) {
        // show tr
        showModal(event);
        $('#modal').show();
    });

    $('.close').click(function () {
        $('#modal').hide();
    });

    // create modal
    function showModal(event) {
        let thead = $('#main thead');
        let tbody = $('#modal-content tbody');
        // init tbody
        tbody.empty();
        // let td1 = $('<td>').text(event.target.parentNode.parentNode.children[0].innerText);
        for (let i = 0; i < event.target.parentNode.parentNode.children.length - 2; i++) {
            let tr = $('<tr>');
            let key = thead[0].children[0].children[i].innerText;
            let tdKey = $('<td>');
            let tdValue = $('<td>');
            // condition for input or paragraph
            if (key === 'salary' || key === 'phone' || key === 'gender') {
                tdKey.text(key);
                let input = $('<input>');
                input.val(event.target.parentNode.parentNode.children[i].innerText);
                tdValue.append(input);
            } else {
                tdKey.text(key);
                let p = $('<p>');
                p.text(event.target.parentNode.parentNode.children[i].innerText);
                tdValue.append(p);
            }
            tr.append(tdKey);
            tr.append(tdValue);
            tbody.append(tr);
        }
        // add save button
        let tr = $('<tr>');
        let td = $('<td>');
        let saveBtn = $('<button>').text('Save');
        saveBtn.addClass('saveBtn');
        td.append(saveBtn);
        tr.append(td);
        tbody.append(tr);
        // save data
        $('.saveBtn').click(function () {
            saveData();
            $('#modal').hide();
        })
    }

    // save data
    function saveData() {
        // get the id
        let id = $('#modal-content tbody tr')[0].children[1].children[0].innerText;
        // get the data from the map by id
        let employee = employeeMap.get(parseInt(id));
        // get the keys from thead
        let thead = $('#main thead');
        for (let i = 0; i < thead[0].children[0].children.length; i++) {
            let key = thead[0].children[0].children[i].innerText;
            if (key === 'salary' || key === 'phone' || key === 'gender') {
                employee[key] = $('#modal-content tbody tr')[i].children[1].children[0].value;
            }
        }
        // update the data in the map
        employeeMap.set(parseInt(id), employee);
        // update the data in the table
        displayData(employeeMap);
    }

    // show modal for delete
    $('.deleteBtn').click(function (event) {
        $('#modal').show();
        $('#modal-content').empty();
        let p = $('<p>').text('Are you sure to delete this employee?');
        let yesBtn = $('<button>').text('Yes');
        let noBtn = $('<button>').text('No');
        yesBtn.addClass('yesBtn');
        noBtn.addClass('noBtn');
        $('#modal-content').append(p, yesBtn, noBtn);
        // delete the employee
        $('.yesBtn').click(function () {
            // get the id
            let id = event.target.parentNode.parentNode.children[0].innerText;
            // delete the employee from the map
            employeeMap.delete(parseInt(id));
            // update the table
            displayData(employeeMap);
            $('#modal').hide();
        });
        // cancel delete
        $('.noBtn').click(function () {
            $('#modal').hide();
        });
    });

    // filter data by department
    $('#filter').change(function () {
        let department = $('#filter').val();
        let filteredMap = new Map();
        for (let [key, value] of employeeMap) {
            if (value.department === department) {
                filteredMap.set(key, value);
            } else if (department === 'all') {
                filteredMap.set(key, value);
            }
        }
        displayData(filteredMap);
    });
}

function displayData(employeeMap) {
    // init tbody
    let tbody = $('#main tbody');
    tbody.empty();
    employeeMap.forEach(function (employee) {
        employee.displayObj()
    });

    // attach all function after the data is loaded
    index();
}
