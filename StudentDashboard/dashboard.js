app = angular.module('myApp', []);

// Navbar Component is included here
app.component('navbar', {
    templateUrl: 'html/navbar.html',
    controller: 'NavbarController'
});



app.controller('dashboardController', ($scope, $http, $q) => {

    // To get digital id from sesion storage. If not present, go to login page
    if (!sessionStorage.getItem('digitalId')) {
        location.href = "login";
    }
    $scope.digitalid = sessionStorage.getItem('digitalId');

    // For mapping semester from string to number
    $scope.theory = {
        "I": 1,
        "II": 2,
        "III": 3,
        "IV": 4,
        "V": 5,
        "VI": 6,
        "VII": 7,
        "VIII": 8
    };


    $http.post('/getAccount', { digitalid: $scope.digitalid })
        .then(response => {
            $scope.student = response.data;
            // console.log($scope.student);

            // Assign Cat Marks and Attendance to variables
            $scope.cat1_marks = $scope.student.cat1.marks;
            $scope.cat2_marks = $scope.student.cat2.marks;
            $scope.cat3_marks = $scope.student.cat3.marks;

            $scope.cat1_attendance = $scope.student.cat1.attendance;
            $scope.cat2_attendance = $scope.student.cat2.attendance;
            $scope.cat3_attendance = $scope.student.cat3.attendance;

            // By defualt, display CAT-1 marks and attendance
            $scope.marks = $scope.cat1_marks;
            $scope.attendance = $scope.cat1_marks;

            // The value to display in circular progress bar. Avg Marks & Attendance
            $scope.progressEndValue1 = $scope.student.cgpa.$numberDecimal;
            $scope.progressEndValue2 = $scope.student.overall_avg_attendance.$numberDecimal;


            // This code runs only after the student data is recieved from backend
            $q.when()
                .then(() => {
                    $http.get('/getSubjects')
                        .then(response => {
                            $scope.subjects = response.data[$scope.student.semester];
                            $scope.theory_subs = response.data.theory_count[$scope.theory[$scope.student.semester] - 1];
                            $scope.sem_credits = response.data.sem_credits;
                            $scope.calcaulateAverage();
                        })
                        .catch(error => {
                            // console.error('Error:', error);
                            showErrorToast(error.data);
                        });
                });
        })
        .catch(error => {
            // console.error('Error:', error);
            showErrorToast(error.data);
        });


    // To scroll to top of the page
    $scope.smoothScroll = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Function to calculate and update scroll progress
    const calcScrollValue = () => {
        const scrollProgress = document.getElementById("progress");
        const pos = document.documentElement.scrollTop;

        // Calculate the height of the scrollable content
        const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Calculate the scroll value as a percentage
        const scrollValue = Math.round((pos * 100) / calcHeight);

        // Update the background of the progress element
        scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
    };

    // Attach the calcScrollValue function to scroll and load events
    window.addEventListener("scroll", calcScrollValue);
    window.addEventListener("load", calcScrollValue);

});
var currentTableIndex = 0; // Track the index of the currently displayed table

// Function to show the selected table and hide others
function showTable(index) {
    // Hide all tables
    var tables = document.querySelectorAll('.table-container');
    tables.forEach(function (table) {
        table.classList.remove('active');
    });

    // Show the selected table
    tables[index].classList.add('active');
    currentTableIndex = index;
}

// Function to show the previous table
function showPreviousTable() {
    currentTableIndex = (currentTableIndex - 1 + tables.length) % tables.length;
    showTable(currentTableIndex);
}

// Function to show the next table
function showNextTable() {
    currentTableIndex = (currentTableIndex + 1) % tables.length;
    showTable(currentTableIndex);
}

// Show the initial table
var tables = document.querySelectorAll('.table-container');
showTable(currentTableIndex);
//-------------------------------------------------------------------------
// Get the context of each canvas element
var ctx1 = document.getElementById('pie_Chart').getContext('2d');
// Define data for each pie chart
var data1 = {
    labels: ['FSD-1', 'Python', 'Digital Electronics', 'Maths'],
    datasets: [{
        data: [58, 70, 86, 61],
        backgroundColor: ['Crimson', 'RoyalBlue', 'LawnGreen', 'GoldenRod']
    }]
};
// Create each pie chart
var subject1Chart = new Chart(ctx1, {
    type: 'pie',
    data: data1,
});
//--------------------------------------------------------------------------
// Get the context of each canvas element
var ctx2 = document.getElementById('bar_Chart').getContext('2d');

// Define data for each bar chart
var data1 = {
    labels: ['FSD-1', 'Python', 'Digital Electronics', 'Maths'],
    datasets: [{
        label: 'Bar Chart',
        data: [58, 70, 86, 61],
        backgroundColor: ['RoyalBlue', 'DeepSkyBlue', 'RoyalBlue', 'DeepSkyBlue']
    }]
};

// Get the canvas element
var lineChartCanvas = document.getElementById("line_Chart").getContext('2d');

// Define data for the line chart
var lineChartData = {
    labels: ['FSD-1', 'Python', 'Digital Electronics', 'Maths'],
    datasets: [{
        label: 'Line Chart',
        data: [58, 70, 86, 61],
        borderColor: 'blue',
        backgroundColor: 'transparent',
        borderWidth: 2
    }]
};

// Create the line chart
var lineChart = new Chart(lineChartCanvas, {
    type: 'line',
    data: lineChartData,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
// Create each bar chart
var bar_Chart = new Chart(ctx2, {
    type: 'bar',
    data: data1,
});


function openPDF(path) {
    window.open(path, '_blank');
}



