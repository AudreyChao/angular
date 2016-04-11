import { isPresent, isBlank } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { PromiseWrapper } from 'angular2/src/facade/promise';
import { Map } from 'angular2/src/facade/collection';
import { convertUrlParamsToArray } from '../url_parser';
import { ComponentInstruction } from '../instruction';
// RouteMatch objects hold information about a match between a rule and a URL
export class RouteMatch {
}
export class PathMatch extends RouteMatch {
    constructor(instruction, remaining, remainingAux) {
        super();
        this.instruction = instruction;
        this.remaining = remaining;
        this.remainingAux = remainingAux;
    }
}
export class RedirectMatch extends RouteMatch {
    constructor(redirectTo, specificity) {
        super();
        this.redirectTo = redirectTo;
        this.specificity = specificity;
    }
}
export class RedirectRule {
    constructor(_pathRecognizer, redirectTo) {
        this._pathRecognizer = _pathRecognizer;
        this.redirectTo = redirectTo;
        this.hash = this._pathRecognizer.hash;
    }
    get path() { return this._pathRecognizer.toString(); }
    set path(val) { throw new BaseException('you cannot set the path of a RedirectRule directly'); }
    /**
     * Returns `null` or a `ParsedUrl` representing the new path to match
     */
    recognize(beginningSegment) {
        var match = null;
        if (isPresent(this._pathRecognizer.matchUrl(beginningSegment))) {
            match = new RedirectMatch(this.redirectTo, this._pathRecognizer.specificity);
        }
        return PromiseWrapper.resolve(match);
    }
    generate(params) {
        throw new BaseException(`Tried to generate a redirect.`);
    }
}
// represents something like '/foo/:bar'
export class RouteRule {
    // TODO: cache component instruction instances by params and by ParsedUrl instance
    constructor(_routePath, handler, _routeName) {
        this._routePath = _routePath;
        this.handler = handler;
        this._routeName = _routeName;
        this._cache = new Map();
        this.specificity = this._routePath.specificity;
        this.hash = this._routePath.hash;
        this.terminal = this._routePath.terminal;
    }
    get path() { return this._routePath.toString(); }
    set path(val) { throw new BaseException('you cannot set the path of a RouteRule directly'); }
    recognize(beginningSegment) {
        var res = this._routePath.matchUrl(beginningSegment);
        if (isBlank(res)) {
            return null;
        }
        return this.handler.resolveComponentType().then((_) => {
            var componentInstruction = this._getInstruction(res.urlPath, res.urlParams, res.allParams);
            return new PathMatch(componentInstruction, res.rest, res.auxiliary);
        });
    }
    generate(params) {
        var generated = this._routePath.generateUrl(params);
        var urlPath = generated.urlPath;
        var urlParams = generated.urlParams;
        return this._getInstruction(urlPath, convertUrlParamsToArray(urlParams), params);
    }
    generateComponentPathValues(params) {
        return this._routePath.generateUrl(params);
    }
    _getInstruction(urlPath, urlParams, params) {
        if (isBlank(this.handler.componentType)) {
            throw new BaseException(`Tried to get instruction before the type was loaded.`);
        }
        var hashKey = urlPath + '?' + urlParams.join('&');
        if (this._cache.has(hashKey)) {
            return this._cache.get(hashKey);
        }
        var instruction = new ComponentInstruction(urlPath, urlParams, this.handler.data, this.handler.componentType, this.terminal, this.specificity, params, this._routeName);
        this._cache.set(hashKey, instruction);
        return instruction;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTQ5TEhhRTllLnRtcC9hbmd1bGFyMi9zcmMvcm91dGVyL3J1bGVzL3J1bGVzLnRzIl0sIm5hbWVzIjpbIlJvdXRlTWF0Y2giLCJQYXRoTWF0Y2giLCJQYXRoTWF0Y2guY29uc3RydWN0b3IiLCJSZWRpcmVjdE1hdGNoIiwiUmVkaXJlY3RNYXRjaC5jb25zdHJ1Y3RvciIsIlJlZGlyZWN0UnVsZSIsIlJlZGlyZWN0UnVsZS5jb25zdHJ1Y3RvciIsIlJlZGlyZWN0UnVsZS5wYXRoIiwiUmVkaXJlY3RSdWxlLnJlY29nbml6ZSIsIlJlZGlyZWN0UnVsZS5nZW5lcmF0ZSIsIlJvdXRlUnVsZSIsIlJvdXRlUnVsZS5jb25zdHJ1Y3RvciIsIlJvdXRlUnVsZS5wYXRoIiwiUm91dGVSdWxlLnJlY29nbml6ZSIsIlJvdXRlUnVsZS5nZW5lcmF0ZSIsIlJvdXRlUnVsZS5nZW5lcmF0ZUNvbXBvbmVudFBhdGhWYWx1ZXMiLCJSb3V0ZVJ1bGUuX2dldEluc3RydWN0aW9uIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUMsTUFBTSwwQkFBMEI7T0FDcEQsRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0M7T0FDckQsRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkI7T0FDbkQsRUFBQyxHQUFHLEVBQUMsTUFBTSxnQ0FBZ0M7T0FHM0MsRUFBTSx1QkFBdUIsRUFBQyxNQUFNLGVBQWU7T0FDbkQsRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQjtBQUtuRCw2RUFBNkU7QUFDN0U7QUFBa0NBLENBQUNBO0FBRW5DLCtCQUErQixVQUFVO0lBQ3ZDQyxZQUFtQkEsV0FBaUNBLEVBQVNBLFNBQWNBLEVBQ3hEQSxZQUFtQkE7UUFDcENDLE9BQU9BLENBQUNBO1FBRlNBLGdCQUFXQSxHQUFYQSxXQUFXQSxDQUFzQkE7UUFBU0EsY0FB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L2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZSc7XG5pbXBvcnQge01hcH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuaW1wb3J0IHtSb3V0ZUhhbmRsZXJ9IGZyb20gJy4vcm91dGVfaGFuZGxlcnMvcm91dGVfaGFuZGxlcic7XG5pbXBvcnQge1VybCwgY29udmVydFVybFBhcmFtc1RvQXJyYXl9IGZyb20gJy4uL3VybF9wYXJzZXInO1xuaW1wb3J0IHtDb21wb25lbnRJbnN0cnVjdGlvbn0gZnJvbSAnLi4vaW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHtSb3V0ZVBhdGh9IGZyb20gJy4vcm91dGVfcGF0aHMvcm91dGVfcGF0aCc7XG5pbXBvcnQge0dlbmVyYXRlZFVybH0gZnJvbSAnLi9yb3V0ZV9wYXRocy9yb3V0ZV9wYXRoJztcblxuXG4vLyBSb3V0ZU1hdGNoIG9iamVjdHMgaG9sZCBpbmZvcm1hdGlvbiBhYm91dCBhIG1hdGNoIGJldHdlZW4gYSBydWxlIGFuZCBhIFVSTFxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJvdXRlTWF0Y2gge31cblxuZXhwb3J0IGNsYXNzIFBhdGhNYXRjaCBleHRlbmRzIFJvdXRlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5zdHJ1Y3Rpb246IENvbXBvbmVudEluc3RydWN0aW9uLCBwdWJsaWMgcmVtYWluaW5nOiBVcmwsXG4gICAgICAgICAgICAgIHB1YmxpYyByZW1haW5pbmdBdXg6IFVybFtdKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVkaXJlY3RNYXRjaCBleHRlbmRzIFJvdXRlTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVkaXJlY3RUbzogYW55W10sIHB1YmxpYyBzcGVjaWZpY2l0eSkgeyBzdXBlcigpOyB9XG59XG5cbi8vIFJ1bGVzIGFyZSByZXNwb25zaWJsZSBmb3IgcmVjb2duaXppbmcgVVJMIHNlZ21lbnRzIGFuZCBnZW5lcmF0aW5nIGluc3RydWN0aW9uc1xuZXhwb3J0IGludGVyZmFjZSBBYnN0cmFjdFJ1bGUge1xuICBoYXNoOiBzdHJpbmc7XG4gIHBhdGg6IHN0cmluZztcbiAgcmVjb2duaXplKGJlZ2lubmluZ1NlZ21lbnQ6IFVybCk6IFByb21pc2U8Um91dGVNYXRjaD47XG4gIGdlbmVyYXRlKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21wb25lbnRJbnN0cnVjdGlvbjtcbn1cblxuZXhwb3J0IGNsYXNzIFJlZGlyZWN0UnVsZSBpbXBsZW1lbnRzIEFic3RyYWN0UnVsZSB7XG4gIHB1YmxpYyBoYXNoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGF0aFJlY29nbml6ZXI6IFJvdXRlUGF0aCwgcHVibGljIHJlZGlyZWN0VG86IGFueVtdKSB7XG4gICAgdGhpcy5oYXNoID0gdGhpcy5fcGF0aFJlY29nbml6ZXIuaGFzaDtcbiAgfVxuXG4gIGdldCBwYXRoKCkgeyByZXR1cm4gdGhpcy5fcGF0aFJlY29nbml6ZXIudG9TdHJpbmcoKTsgfVxuICBzZXQgcGF0aCh2YWwpIHsgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ3lvdSBjYW5ub3Qgc2V0IHRoZSBwYXRoIG9mIGEgUmVkaXJlY3RSdWxlIGRpcmVjdGx5Jyk7IH1cblxuICAvKipcbiAgICogUmV0dXJucyBgbnVsbGAgb3IgYSBgUGFyc2VkVXJsYCByZXByZXNlbnRpbmcgdGhlIG5ldyBwYXRoIHRvIG1hdGNoXG4gICAqL1xuICByZWNvZ25pemUoYmVnaW5uaW5nU2VnbWVudDogVXJsKTogUHJvbWlzZTxSb3V0ZU1hdGNoPiB7XG4gICAgdmFyIG1hdGNoID0gbnVsbDtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3BhdGhSZWNvZ25pemVyLm1hdGNoVXJsKGJlZ2lubmluZ1NlZ21lbnQpKSkge1xuICAgICAgbWF0Y2ggPSBuZXcgUmVkaXJlY3RNYXRjaCh0aGlzLnJlZGlyZWN0VG8sIHRoaXMuX3BhdGhSZWNvZ25pemVyLnNwZWNpZmljaXR5KTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnJlc29sdmUobWF0Y2gpO1xuICB9XG5cbiAgZ2VuZXJhdGUocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBvbmVudEluc3RydWN0aW9uIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVHJpZWQgdG8gZ2VuZXJhdGUgYSByZWRpcmVjdC5gKTtcbiAgfVxufVxuXG5cbi8vIHJlcHJlc2VudHMgc29tZXRoaW5nIGxpa2UgJy9mb28vOmJhcidcbmV4cG9ydCBjbGFzcyBSb3V0ZVJ1bGUgaW1wbGVtZW50cyBBYnN0cmFjdFJ1bGUge1xuICBzcGVjaWZpY2l0eTogc3RyaW5nO1xuICB0ZXJtaW5hbDogYm9vbGVhbjtcbiAgaGFzaDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2NhY2hlOiBNYXA8c3RyaW5nLCBDb21wb25lbnRJbnN0cnVjdGlvbj4gPSBuZXcgTWFwPHN0cmluZywgQ29tcG9uZW50SW5zdHJ1Y3Rpb24+KCk7XG5cbiAgLy8gVE9ETzogY2FjaGUgY29tcG9uZW50IGluc3RydWN0aW9uIGluc3RhbmNlcyBieSBwYXJhbXMgYW5kIGJ5IFBhcnNlZFVybCBpbnN0YW5jZVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlUGF0aDogUm91dGVQYXRoLCBwdWJsaWMgaGFuZGxlcjogUm91dGVIYW5kbGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9yb3V0ZU5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuc3BlY2lmaWNpdHkgPSB0aGlzLl9yb3V0ZVBhdGguc3BlY2lmaWNpdHk7XG4gICAgdGhpcy5oYXNoID0gdGhpcy5fcm91dGVQYXRoLmhhc2g7XG4gICAgdGhpcy50ZXJtaW5hbCA9IHRoaXMuX3JvdXRlUGF0aC50ZXJtaW5hbDtcbiAgfVxuXG4gIGdldCBwYXRoKCkgeyByZXR1cm4gdGhpcy5fcm91dGVQYXRoLnRvU3RyaW5nKCk7IH1cbiAgc2V0IHBhdGgodmFsKSB7IHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCd5b3UgY2Fubm90IHNldCB0aGUgcGF0aCBvZiBhIFJvdXRlUnVsZSBkaXJlY3RseScpOyB9XG5cbiAgcmVjb2duaXplKGJlZ2lubmluZ1NlZ21lbnQ6IFVybCk6IFByb21pc2U8Um91dGVNYXRjaD4ge1xuICAgIHZhciByZXMgPSB0aGlzLl9yb3V0ZVBhdGgubWF0Y2hVcmwoYmVnaW5uaW5nU2VnbWVudCk7XG4gICAgaWYgKGlzQmxhbmsocmVzKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5yZXNvbHZlQ29tcG9uZW50VHlwZSgpLnRoZW4oKF8pID0+IHtcbiAgICAgIHZhciBjb21wb25lbnRJbnN0cnVjdGlvbiA9IHRoaXMuX2dldEluc3RydWN0aW9uKHJlcy51cmxQYXRoLCByZXMudXJsUGFyYW1zLCByZXMuYWxsUGFyYW1zKTtcbiAgICAgIHJldHVybiBuZXcgUGF0aE1hdGNoKGNvbXBvbmVudEluc3RydWN0aW9uLCByZXMucmVzdCwgcmVzLmF1eGlsaWFyeSk7XG4gICAgfSk7XG4gIH1cblxuICBnZW5lcmF0ZShwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcG9uZW50SW5zdHJ1Y3Rpb24ge1xuICAgIHZhciBnZW5lcmF0ZWQgPSB0aGlzLl9yb3V0ZVBhdGguZ2VuZXJhdGVVcmwocGFyYW1zKTtcbiAgICB2YXIgdXJsUGF0aCA9IGdlbmVyYXRlZC51cmxQYXRoO1xuICAgIHZhciB1cmxQYXJhbXMgPSBnZW5lcmF0ZWQudXJsUGFyYW1zO1xuICAgIHJldHVybiB0aGlzLl9nZXRJbnN0cnVjdGlvbih1cmxQYXRoLCBjb252ZXJ0VXJsUGFyYW1zVG9BcnJheSh1cmxQYXJhbXMpLCBwYXJhbXMpO1xuICB9XG5cbiAgZ2VuZXJhdGVDb21wb25lbnRQYXRoVmFsdWVzKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBHZW5lcmF0ZWRVcmwge1xuICAgIHJldHVybiB0aGlzLl9yb3V0ZVBhdGguZ2VuZXJhdGVVcmwocGFyYW1zKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEluc3RydWN0aW9uKHVybFBhdGg6IHN0cmluZywgdXJsUGFyYW1zOiBzdHJpbmdbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBvbmVudEluc3RydWN0aW9uIHtcbiAgICBpZiAoaXNCbGFuayh0aGlzLmhhbmRsZXIuY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBUcmllZCB0byBnZXQgaW5zdHJ1Y3Rpb24gYmVmb3JlIHRoZSB0eXBlIHdhcyBsb2FkZWQuYCk7XG4gICAgfVxuICAgIHZhciBoYXNoS2V5ID0gdXJsUGF0aCArICc/JyArIHVybFBhcmFtcy5qb2luKCcmJyk7XG4gICAgaWYgKHRoaXMuX2NhY2hlLmhhcyhoYXNoS2V5KSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlLmdldChoYXNoS2V5KTtcbiAgICB9XG4gICAgdmFyIGluc3RydWN0aW9uID1cbiAgICAgICAgbmV3IENvbXBvbmVudEluc3RydWN0aW9uKHVybFBhdGgsIHVybFBhcmFtcywgdGhpcy5oYW5kbGVyLmRhdGEsIHRoaXMuaGFuZGxlci5jb21wb25lbnRUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXJtaW5hbCwgdGhpcy5zcGVjaWZpY2l0eSwgcGFyYW1zLCB0aGlzLl9yb3V0ZU5hbWUpO1xuICAgIHRoaXMuX2NhY2hlLnNldChoYXNoS2V5LCBpbnN0cnVjdGlvbik7XG5cbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb247XG4gIH1cbn1cbiJdfQ==