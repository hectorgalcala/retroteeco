storeApp.controller('AdminController', function ($scope, $filter) {
    $scope.isActive = false;
    $scope.sections = [
        {name: 'List View', class: "cbp-vm-list"}];
    
    $scope.toggleVis = function () {
        $('ul li:nth-child(2)').slideToggle('slow');
    }

    $scope.setMaster = function (section) {
        $scope.selected = section;
        $scope.isActive = !$scope.isActive;
    }

    $scope.slide = function(dir) {
        $('#shirtCarousel').carousel(dir);
    }

    $scope.isSelected = function (section) {
        return $scope.selected === section;
    }

    $scope.sizes = ['S', 'M', 'L']
    $scope.selectedSize = 0;
    $scope.selectSize = function(index) {
        $scope.selected = index;
    }

    $scope.findActive = function () {
        var inText = ''
        var whatSize = document.getElementsByClassName("activeSize");
        var wrapSize = angular.element(whatSize);
        if (wrapSize.length == 1) {
            inText = wrapSize[0].innerHTML;
        }
        else {
            inText =  'empty size';
        }
        return inText;
    }

    var myStore = new store();
    $scope.currentPage = 0;
    $scope.pageSize = 9;
    $scope.numberOfPages = Math.ceil(myStore.products.length / $scope.pageSize);

    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.pagedItems = [];

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };
    $scope.search = function (name) {
        $scope.filteredItems = $filter('filter')(myStore.products, function (product) {
            for (var attr in product) {
                if (searchMatch(product[name], $scope.query))
                    return true;
            }
            return false;
        });
        $scope.currentPage = 0;
        $scope.groupToPages();
    };
    $scope.myFilter = function (column, category) {
        $scope.filteredItems = $filter('filter')(myStore.products, function (product) {
            for (var attr in product) {
                if (searchMatch(product[column], category))
                    return true;
            }
            return false;
        });
        $scope.currentPage = 0;
        $scope.groupToPages();
    };
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.pageSize === 0) {
                $scope.pagedItems[Math.floor(i / $scope.pageSize)] = [$scope.filteredItems[i]];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.pageSize)].push($scope.filteredItems[i]);
            }
        }
    };

    // functions have been describe process the data for display
    $scope.myFilter();
    $scope.search();

});

function store() {
    this.products = [
          { num: 1, code: 'MD1', category: 'graphictee', name: 'Newsies at Skeeter\'s Branch', src: "../img/NSB/01.jpg", isSizeInStock: {S: true, M: true, L: true}, description: 'Our Model 1 portrays a print from the famous american photographer Lewis Wickes Hine. Using his camera as a tool for social reform, he traveled around the country to show the condition in which children were working. His photographs helped bring attention to this matter and change child labor laws in the United States.', price: 29.00, cal: 10 }];

}

function detailsprod() {
    this.detailsprod = [{}];
}

store.prototype.getProduct = function (code) {
    for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].code == code)
            return this.products[i];
    }
    
    return null;
}
