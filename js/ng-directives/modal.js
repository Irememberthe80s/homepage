angular.module("Homepage").directive("modal", function(){
    return {
        restrict: "E",
        template: ['<div class="modal" ng-show="modalOpen" toggle-keys="{{ { escape: \'modalClose\' } }}" toggle-keys-enabled="modalOpen" ng-cloak>',
                  '<div class="modal-background"></div>',
                  '<div class="modal-contents closes-modal" ng-transclude>',
                  '</div></div>'].join(""),
        transclude: true,
        replace: true,
        require: '?ngModel',
        link: function($scope, element, attrs, ngModel){
            element[0].addEventListener("click", function(e){
                if (e.target.classList.contains("closes-modal"))
                    $scope.$apply($scope.modalClose);
            });

            $scope.modalClose = function(){
                $scope.modalOpen = false;
                ngModel.$setViewValue(false);
                $scope.$emit("modalClose")
            };

            ngModel.$render = function() {
                $scope.modalOpen = ngModel.$viewValue;
            };
        }
    }
});