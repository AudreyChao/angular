import { verifyNoBrowserErrors, browser } from 'angular2/src/testing/e2e_util';
import { expect } from 'angular2/testing';
function waitForElement(selector) {
    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be present on the dom.
    browser.wait(EC.presenceOf($(selector)), 20000);
}
describe('reuse example app', function () {
    afterEach(verifyNoBrowserErrors);
    var URL = 'angular2/examples/router/ts/can_activate/';
    it('should navigate to user 1', function () {
        browser.get(URL);
        waitForElement('home-cmp');
        element(by.css('#user-1-link')).click();
        waitForElement('control-panel-cmp');
        expect(browser.getCurrentUrl()).toMatch(/\/user-settings\/1$/);
        expect(element(by.css('control-panel-cmp')).getText()).toContain('Settings');
    });
    it('should not navigate to user 2', function () {
        browser.get(URL);
        waitForElement('home-cmp');
        element(by.css('#user-2-link')).click();
        waitForElement('home-cmp');
        expect(element(by.css('home-cmp')).getText()).toContain('Welcome Home!');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuX2FjdGl2YXRlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTQ5TEhhRTllLnRtcC9hbmd1bGFyMi9leGFtcGxlcy9yb3V0ZXIvdHMvY2FuX2FjdGl2YXRlL2Nhbl9hY3RpdmF0ZV9zcGVjLnRzIl0sIm5hbWVzIjpbIndhaXRGb3JFbGVtZW50Il0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLHFCQUFxQixFQUFFLE9BQU8sRUFBQyxNQUFNLCtCQUErQjtPQUNyRSxFQUFDLE1BQU0sRUFBQyxNQUFNLGtCQUFrQjtBQUV2Qyx3QkFBd0IsUUFBZ0I7SUFDdENBLElBQUlBLEVBQUVBLEdBQVNBLFVBQVdBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7SUFDOUNBLGdFQUFnRUE7SUFDaEVBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO0FBQ2xEQSxDQUFDQTtBQUVELFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtJQUU1QixTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUVqQyxJQUFJLEdBQUcsR0FBRywyQ0FBMkMsQ0FBQztJQUV0RCxFQUFFLENBQUMsMkJBQTJCLEVBQUU7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFL0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvRSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQkFBK0IsRUFBRTtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUzQixPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUzQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMzRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2ZXJpZnlOb0Jyb3dzZXJFcnJvcnMsIGJyb3dzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy90ZXN0aW5nL2UyZV91dGlsJztcbmltcG9ydCB7ZXhwZWN0fSBmcm9tICdhbmd1bGFyMi90ZXN0aW5nJztcblxuZnVuY3Rpb24gd2FpdEZvckVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZykge1xuICB2YXIgRUMgPSAoPGFueT5wcm90cmFjdG9yKS5FeHBlY3RlZENvbmRpdGlvbnM7XG4gIC8vIFdhaXRzIGZvciB0aGUgZWxlbWVudCB3aXRoIGlkICdhYmMnIHRvIGJlIHByZXNlbnQgb24gdGhlIGRvbS5cbiAgYnJvd3Nlci53YWl0KEVDLnByZXNlbmNlT2YoJChzZWxlY3RvcikpLCAyMDAwMCk7XG59XG5cbmRlc2NyaWJlKCdyZXVzZSBleGFtcGxlIGFwcCcsIGZ1bmN0aW9uKCkge1xuXG4gIGFmdGVyRWFjaCh2ZXJpZnlOb0Jyb3dzZXJFcnJvcnMpO1xuXG4gIHZhciBVUkwgPSAnYW5ndWxhcjIvZXhhbXBsZXMvcm91dGVyL3RzL2Nhbl9hY3RpdmF0ZS8nO1xuXG4gIGl0KCdzaG91bGQgbmF2aWdhdGUgdG8gdXNlciAxJywgZnVuY3Rpb24oKSB7XG4gICAgYnJvd3Nlci5nZXQoVVJMKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnaG9tZS1jbXAnKTtcblxuICAgIGVsZW1lbnQoYnkuY3NzKCcjdXNlci0xLWxpbmsnKSkuY2xpY2soKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnY29udHJvbC1wYW5lbC1jbXAnKTtcbiAgICBleHBlY3QoYnJvd3Nlci5nZXRDdXJyZW50VXJsKCkpLnRvTWF0Y2goL1xcL3VzZXItc2V0dGluZ3NcXC8xJC8pO1xuXG4gICAgZXhwZWN0KGVsZW1lbnQoYnkuY3NzKCdjb250cm9sLXBhbmVsLWNtcCcpKS5nZXRUZXh0KCkpLnRvQ29udGFpbignU2V0dGluZ3MnKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBub3QgbmF2aWdhdGUgdG8gdXNlciAyJywgZnVuY3Rpb24oKSB7XG4gICAgYnJvd3Nlci5nZXQoVVJMKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnaG9tZS1jbXAnKTtcblxuICAgIGVsZW1lbnQoYnkuY3NzKCcjdXNlci0yLWxpbmsnKSkuY2xpY2soKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnaG9tZS1jbXAnKTtcblxuICAgIGV4cGVjdChlbGVtZW50KGJ5LmNzcygnaG9tZS1jbXAnKSkuZ2V0VGV4dCgpKS50b0NvbnRhaW4oJ1dlbGNvbWUgSG9tZSEnKTtcbiAgfSk7XG59KTtcbiJdfQ==