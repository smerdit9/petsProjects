const studentsList = [
    {name: 'Евгений', surname: 'Павлов', middleName: 'Павлович', date: new Date('2003.10.6'), startStudyYear: new Date('2020.9.1'), faculty: 'Экономический'},
    {name: 'Ярослав', surname: 'Кудрявцев', middleName: 'Викторовоич', date: new Date('2004.5.22'), startStudyYear: new Date('2021.9.1'), faculty: 'Теории спорта'},
    {name: 'Виктория', surname: 'Кузьмина', middleName: 'Михайловна', date: new Date('2004.3.12'), startStudyYear: new Date('2021.9.1'), faculty: 'Биологический'},
    {name: 'Александр', surname: 'Старостин', middleName: 'Александрович', date: new Date('2005.10.2'), startStudyYear: new Date('2022.9.1'), faculty: 'Технических наук'},
    {name: 'Игорь', surname: 'Никитин', middleName: 'Петрович', date: new Date('2002.6.17'), startStudyYear: new Date('2019.9.1'), faculty: 'Архитектурный'},
]

function getStudentItem(studentObj) {
    let studentItem = document.createElement('tr');
    let studentName = document.createElement('td');
    let studentBirthDay = document.createElement('td');
    let studentStartStudyYear = document.createElement('td');
    let studentFaculty = document.createElement('td');

    studentItem.append(studentName);
    studentItem.append(studentBirthDay);
    studentItem.append(studentStartStudyYear);
    studentItem.append(studentFaculty);

    let birthDay = '';
    birthDay = studentObj.date.getDate() < 10 ? birthDay + '0' + studentObj.date.getDate() + '.' : birthDay + studentObj.date.getDate() + '.';
    birthDay = studentObj.date.getMonth() < 9 ? birthDay + '0' + (studentObj.date.getMonth() + 1) + '.' : birthDay + (studentObj.date.getMonth() + 1) + '.';
    birthDay = birthDay + studentObj.date.getFullYear();

    let faculty = Math.floor((Number(new Date()) - Number(studentObj.startStudyYear)) / 1000 / 3600 / 24 / 365) > 4 ? 'Закончил' : Math.floor((Number(new Date()) - Number(studentObj.startStudyYear)) / 1000 / 3600 / 24 / 365);
    if (faculty === 'Закончил') {
        studentStartStudyYear.textContent = studentObj.startStudyYear.getFullYear() + '-' + (studentObj.startStudyYear.getFullYear() + 4) + ' (' + faculty + ')';
    } else {
        studentStartStudyYear.textContent = studentObj.startStudyYear.getFullYear() + '-' + (studentObj.startStudyYear.getFullYear() + 4) + ' (' + faculty + ' курс' + ')';
    }

    studentName.textContent = `${studentObj.surname} ${studentObj.name} ${studentObj.middleName}`;
    studentBirthDay.textContent = birthDay + ' (' + Math.floor((Number(new Date()) - Number(studentObj.date)) / 1000 / 3600 / 24 / 365) + ' лет' + ')';
    studentFaculty.textContent = studentObj.faculty;
    return {
        studentItem,
        studentName,
        studentFaculty,  
    };
        
}

function renderStudentsTable(studentsArray) {
    let table = document.getElementById('table');
    if (table.children[1] === undefined) {
        for (let i = 0; i < studentsArray.length; ++i) {
            let studentItem  = getStudentItem(studentsArray[i]).studentItem;
            table.append(studentItem);  
        }
    } else {
        let studentItem  = getStudentItem(studentsArray[studentsArray.length - 1]).studentItem;
        table.append(studentItem); 
    }
}
renderStudentsTable(studentsList);


let form = document.getElementById('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let name = document.getElementById('name');
    let surname = document.getElementById('surname');
    let middleName = document.getElementById('middleName');
    let birthDay = document.getElementById('birthday');
    let startStudyYear = document.getElementById('startStudyYear');
    let facultyInput = document.getElementById('facultyInput');
    let nameError = document.getElementById('nameError');
    let dateError = document.getElementById('dateError');
    let startYearError = document.getElementById('startYearError');
    let startYearErrorRange = document.getElementById('startYearErrorRange');
    let facultyError = document.getElementById('facultyError');
    let dateErrorRange = document.getElementById('dateErrorRange');
    nameError.style.display = 'none';
    dateError.style.display = 'none';
    dateErrorRange.style.display = 'none';
    startYearError.style.display = 'none';
    startYearErrorRange.style.display = 'none';
    facultyError.style.display = 'none';

    let n = -1;
    if (name.value.trim() === '' || surname.value.trim() === '' || middleName.value.trim() === '') {
        nameError.style.display = 'block';
        n = 1;
    };
    if (!birthDay.valueAsDate) {
        dateError.style.display = 'block';
        n = 1;
    };
    if (!startStudyYear.valueAsDate) {
        startYearError.style.display = 'block';
        n = 1;
    };
    if (facultyInput.value.trim() === '') {
        facultyError.style.display = 'block';
        n = 1;
    };
    if (birthDay.valueAsDate && (birthDay.valueAsDate < new Date('1900.01.01') || birthDay.valueAsDate > new Date())) {
        dateErrorRange.style.display = 'block';
        n = 1;
    }
    if (startStudyYear.valueAsDate && (startStudyYear.valueAsDate < new Date('2000.01.01') || startStudyYear.valueAsDate > new Date())) {
        startYearErrorRange.style.display = 'block';
        n = 1;
    }
    if (n < 0) {
        let newStudentObj = {
            name: name.value, 
            surname: surname.value, 
            middleName: middleName.value, 
            date: birthDay.valueAsDate,
            startStudyYear: startStudyYear.valueAsDate,
            faculty: facultyInput.value,
        };
        
        studentsList.push(newStudentObj);
        name.value = '';
        surname.value = '';
        middleName.value = '';
        facultyInput.value = '';
        birthDay.valueAsDate = null;
        startStudyYear.valueAsDate = null;

        nameError.style.display = 'none';
        dateError.style.display = 'none';
        startYearError.style.display = 'none';
        facultyError.style.display = 'none';
        renderStudentsTable(studentsList);
        console.log(studentsList);
    }
})

let studentsTemp = [];

let sortBtnName = document.getElementById('sort-btn-name');

sortBtnName.addEventListener('click', () => {
    if (studentsTemp[0] === undefined) {
        for (let i = 0; i < studentsList.length; ++i) {
            for (let j = 0; j < studentsList.length - 1; ++j) {
                if (studentsList[j].surname > studentsList[j + 1].surname) {
                    let temp = studentsList[j];
                    studentsList[j] = studentsList[j + 1];
                    studentsList[j + 1] = temp;
                };
            };
        };
        let table = document.getElementById('table');
        table.textContent = '';
        renderStudentsTable(studentsList);
    } else {
        for (let i = 0; i < studentsTemp.length; ++i) {
            for (let j = 0; j < studentsTemp.length - 1; ++j) {
                if (studentsTemp[j].surname > studentsTemp[j + 1].surname) {
                    let temp = studentsTemp[j];
                    studentsTemp[j] = studentsTemp[j + 1];
                    studentsTemp[j + 1] = temp;
                };
            };
        };
        let table = document.getElementById('table');
        table.textContent = '';
        renderStudentsTable(studentsTemp);
    }
});

let sortBtnBirthDay = document.getElementById('sort-btn-birthday');

sortBtnBirthDay.addEventListener('click', () => {
    if (studentsTemp[0] === undefined) {
        for (let i = 0; i < studentsList.length; ++i) {
            for (let j = 0; j < studentsList.length - 1; ++j) {
                if (studentsList[j].date > studentsList[j + 1].date) {
                    let temp = studentsList[j];
                    studentsList[j] = studentsList[j + 1];
                    studentsList[j + 1] = temp;
                };
            };
        };
        let table = document.getElementById('table');
        table.textContent = '';
        renderStudentsTable(studentsList);
    } else {
        for (let i = 0; i < studentsTemp.length; ++i) {
            for (let j = 0; j < studentsTemp.length - 1; ++j) {
                if (studentsTemp[j].date > studentsTemp[j + 1].date) {
                    let temp = studentsTemp[j];
                    studentsTemp[j] = studentsTemp[j + 1];
                    studentsTemp[j + 1] = temp;
                };
            };
        };
        let table = document.getElementById('table');
        table.textContent = '';
        renderStudentsTable(studentsTemp);
    }
});

let sortBtnStudyYears = document.getElementById('sort-btn-studyYears');

sortBtnStudyYears.addEventListener('click', () => {
    if (studentsTemp[0] === undefined) {
        for (let i = 0; i < studentsList.length; ++i) {
            for (let j = 0; j < studentsList.length - 1; ++j) {
                if (studentsList[j].startStudyYear > studentsList[j + 1].startStudyYear) {
                    let temp = studentsList[j];
                    studentsList[j] = studentsList[j + 1];
                    studentsList[j + 1] = temp;
                };
            };
        };
        let table = document.getElementById('table');
        table.textContent = '';
        renderStudentsTable(studentsList);
    } else {
        for (let i = 0; i < studentsTemp.length; ++i) {
            for (let j = 0; j < studentsTemp.length - 1; ++j) {
                if (studentsTemp[j].startStudyYear > studentsTemp[j + 1].startStudyYear) {
                    let temp = studentsTemp[j];
                    studentsTemp[j] = studentsTemp[j + 1];
                    studentsTemp[j + 1] = temp;
                };
            };
        };
        let table = document.getElementById('table');
        table.textContent = '';
        renderStudentsTable(studentsTemp);
    }
});

let sortBtnFaculty = document.getElementById('sort-btn-faculty');

sortBtnFaculty.addEventListener('click', () => {
    if (studentsTemp[0] === undefined) {
        for (let i = 0; i < studentsList.length; ++i) {
            for (let j = 0; j < studentsList.length - 1; ++j) {
                if (studentsList[j].faculty > studentsList[j + 1].faculty) {
                    let temp = studentsList[j];
                    studentsList[j] = studentsList[j + 1];
                    studentsList[j + 1] = temp;
                };
            };
        };
        let table = document.getElementById('table');
        table.textContent = '';
        renderStudentsTable(studentsList);
    } else {
        for (let i = 0; i < studentsTemp.length; ++i) {
            for (let j = 0; j < studentsTemp.length - 1; ++j) {
                if (studentsTemp[j].faculty > studentsTemp[j + 1].faculty) {
                    let temp = studentsTemp[j];
                    studentsTemp[j] = studentsTemp[j + 1];
                    studentsTemp[j + 1] = temp;
                };
            };
        };
        let table = document.getElementById('table');
        table.textContent = '';
        renderStudentsTable(studentsTemp);
    }
});

let filtrationBtn = document.getElementById('filtration-btn');
let filtrationName = document.getElementById('filtration-name');
let filtrationFaculty = document.getElementById('filtration-faculty');
let filtrationStartStudy = document.getElementById('filtration-startStudy');
let filtrationEndStudy = document.getElementById('filtration-endStudy');

filtrationBtn.addEventListener('click', () => {
    studentsTemp = [];
    if (filtrationName.value === '' && filtrationFaculty.value === '' && filtrationStartStudy.value === '' && filtrationEndStudy.value === '') {
        table.textContent = '';
        renderStudentsTable(studentsList);
        return;
    }

    let studentFiltration = [];
    for (let i = 0; i < studentsList.length; ++i) {
        let studentNameLower = getStudentItem(studentsList[i]).studentName.textContent.toLowerCase();
        if (filtrationName.value !== '' && studentNameLower.includes(filtrationName.value.toLowerCase())) {
            studentFiltration.push(studentsList[i]);
        }
    }

    for (let i = 0; i < studentsList.length; ++i) {
        let studentFacultyLower = getStudentItem(studentsList[i]).studentFaculty.textContent.toLowerCase();
        if (filtrationFaculty.value !== '' && studentFacultyLower.includes(filtrationFaculty.value.toLowerCase())) {
            if (studentFiltration.includes(studentsList[i])) {
                continue;
            } else {
                studentFiltration.push(studentsList[i]);
            }
        }
    }

    for (let i = 0; i < studentsList.length; ++i) {
        let studentStartStudyLower = String(studentsList[i].startStudyYear.getFullYear());
        if (filtrationStartStudy.value !== '' && studentStartStudyLower === filtrationStartStudy.value) {
            if (studentFiltration.includes(studentsList[i])) {
                continue;
            } else {
                studentFiltration.push(studentsList[i]);
            }
        }
    }

    for (let i = 0; i < studentsList.length; ++i) {
        let studentEndStudyLower = String(studentsList[i].startStudyYear.getFullYear() + 4);
        if (filtrationEndStudy.value !== '' && studentEndStudyLower === filtrationEndStudy.value) {
            if (studentFiltration.includes(studentsList[i])) {
                continue;
            } else {
                studentFiltration.push(studentsList[i]);
            }
        }
    }

    for (let i = 0; i < studentFiltration.length; ++i) {
        let temp = 0;
        let studentNameLower = (studentFiltration[i].name + studentFiltration[i].surname + studentFiltration[i].middleName).toLowerCase();
        let studentFacultyLower = studentFiltration[i].faculty.toLowerCase();
        let studentStartStudyLower = String(studentFiltration[i].startStudyYear.getFullYear());
        let studentEndStudyLower = String(studentFiltration[i].startStudyYear.getFullYear() + 4);

        if (filtrationName.value === '') {
            temp++;
        } else {
            if (studentNameLower.includes(filtrationName.value.toLowerCase())) {
                temp++;
            }
        }
        
        if (filtrationFaculty.value === '') {
            temp++;
        } else {
            if (studentFacultyLower.includes(filtrationFaculty.value.toLowerCase())) {
                temp++;
            }
        }

        if (filtrationStartStudy.value === '') {
            temp++;
        } else {
            if (studentStartStudyLower === filtrationStartStudy.value) {
                temp++;
            }
        }

        if (filtrationEndStudy.value === '') {
            temp++;
        } else {
            if (studentEndStudyLower === filtrationEndStudy.value) {
                temp++;
            }
        }

        if (temp === 4) {
            studentsTemp.push(studentFiltration[i]);
        }
    }

    table.textContent = '';
    renderStudentsTable(studentsTemp);
});