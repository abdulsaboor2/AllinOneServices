"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react")); // eslint-disable-line import/no-extraneous-dependencies, no-use-before-define
const react_native_1 = require("react-native");
const picker_1 = require("@react-native-picker/picker");
const country_1 = __importDefault(require("./country"));
const styles_1 = __importDefault(require("./styles"));
const PickerItem = picker_1.Picker.Item;
class CountryPicker extends react_1.Component {
    constructor(props) {
        super(props);
        this.onPressCancel = () => {
            if (this.props.onPressCancel) {
                this.props.onPressCancel();
            }
            this.setState({
                modalVisible: false,
            });
        };
        this.onPressSubmit = () => {
            if (this.props.onPressConfirm) {
                this.props.onPressConfirm();
            }
            if (this.props.onSubmit) {
                this.props.onSubmit(this.state.selectedCountry);
            }
            this.setState({
                modalVisible: false,
            });
        };
        this.onValueChange = (selectedCountry) => {
            this.setState({
                selectedCountry,
            });
        };
        this.state = {
            buttonColor: this.props.buttonColor || '#007AFF',
            modalVisible: false,
            selectedCountry: this.props.selectedCountry || country_1.default.getAll()[0],
        };
    }
    selectCountry(selectedCountry) {
        this.setState({
            selectedCountry,
        });
    }
    show() {
        this.setState({
            modalVisible: true,
        });
    }
    // eslint-disable-next-line class-methods-use-this
    renderItem(country, index) {
        return react_1.default.createElement(PickerItem, { key: country.iso2, value: country.iso2, label: country.name });
    }
    render() {
        const { buttonColor } = this.state;
        const itemStyle = this.props.itemStyle || {};
        return (react_1.default.createElement(react_native_1.Modal, { animationType: "slide", transparent: true, visible: this.state.modalVisible, onRequestClose: () => {
                console.log('Country picker has been closed.');
            } },
            react_1.default.createElement(react_native_1.View, { style: styles_1.default.basicContainer },
                react_1.default.createElement(react_native_1.View, { style: [
                        styles_1.default.modalContainer,
                        { backgroundColor: this.props.pickerBackgroundColor || 'white' },
                    ] },
                    react_1.default.createElement(react_native_1.View, { style: styles_1.default.buttonView },
                        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: this.onPressCancel },
                            react_1.default.createElement(react_native_1.Text, { style: [{ color: buttonColor }, this.props.cancelTextStyle] }, this.props.cancelText || 'Cancel')),
                        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: this.onPressSubmit },
                            react_1.default.createElement(react_native_1.Text, { style: [{ color: buttonColor }, this.props.confirmTextStyle] }, this.props.confirmText || 'Confirm'))),
                    react_1.default.createElement(react_native_1.View, { style: styles_1.default.mainBox },
                        react_1.default.createElement(picker_1.Picker, { ref: (ref) => {
                                this.picker = ref;
                            }, style: styles_1.default.bottomPicker, selectedValue: this.state.selectedCountry, onValueChange: (country) => this.onValueChange(country), itemStyle: itemStyle, mode: "dialog" }, country_1.default.getAll().map((country, index) => this.renderItem(country, index))))))));
    }
}
exports.default = CountryPicker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291bnRyeVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db3VudHJ5UGlja2VyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBeUMsQ0FBQyw4RUFBOEU7QUFDeEgsK0NBRXNCO0FBQ3RCLHdEQUFxRDtBQUVyRCx3REFBZ0M7QUFDaEMsc0RBQThCO0FBRzlCLE1BQU0sVUFBVSxHQUFHLGVBQU0sQ0FBQyxJQUFJLENBQUM7QUFFL0IsTUFBcUIsYUFBYyxTQUFRLGlCQUF1RTtJQUc5RyxZQUFZLEtBQUs7UUFDYixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFlakIsa0JBQWEsR0FBRyxHQUFHLEVBQUU7WUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUM5QjtZQUVELElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsWUFBWSxFQUFFLEtBQUs7YUFDdEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBRUQsa0JBQWEsR0FBRyxHQUFHLEVBQUU7WUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMvQjtZQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDbkQ7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLFlBQVksRUFBRSxLQUFLO2FBQ3RCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVELGtCQUFhLEdBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLGVBQWU7YUFDbEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBekNHLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksU0FBUztZQUNoRCxZQUFZLEVBQUUsS0FBSztZQUNuQixlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDckUsQ0FBQztJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsZUFBZTtRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsZUFBZTtTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBZ0NELElBQUk7UUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtEQUFrRDtJQUNsRCxVQUFVLENBQUMsT0FBTyxFQUFFLEtBQUs7UUFDckIsT0FBTyw4QkFBQyxVQUFVLElBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEdBQUksQ0FBQztJQUN2RixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25DLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxPQUFPLENBQ0gsOEJBQUMsb0JBQUssSUFDRixhQUFhLEVBQUMsT0FBTyxFQUNyQixXQUFXLFFBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUNoQyxjQUFjLEVBQUUsR0FBRyxFQUFFO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDbkQsQ0FBQztZQUVELDhCQUFDLG1CQUFJLElBQUMsS0FBSyxFQUFFLGdCQUFNLENBQUMsY0FBYztnQkFDOUIsOEJBQUMsbUJBQUksSUFDRCxLQUFLLEVBQUU7d0JBQ0gsZ0JBQU0sQ0FBQyxjQUFjO3dCQUNyQixFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixJQUFJLE9BQU8sRUFBRTtxQkFDbkU7b0JBRUQsOEJBQUMsbUJBQUksSUFBQyxLQUFLLEVBQUUsZ0JBQU0sQ0FBQyxVQUFVO3dCQUMxQiw4QkFBQywrQkFBZ0IsSUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWE7NEJBQ3pDLDhCQUFDLG1CQUFJLElBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksUUFBUSxDQUMvQixDQUNRO3dCQUVuQiw4QkFBQywrQkFBZ0IsSUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWE7NEJBQ3pDLDhCQUFDLG1CQUFJLElBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUM3RCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxTQUFTLENBQ2pDLENBQ1EsQ0FDaEI7b0JBRVAsOEJBQUMsbUJBQUksSUFBQyxLQUFLLEVBQUUsZ0JBQU0sQ0FBQyxPQUFPO3dCQUN2Qiw4QkFBQyxlQUFNLElBQ0gsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0NBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7NEJBQ3RCLENBQUMsRUFDRCxLQUFLLEVBQUUsZ0JBQU0sQ0FBQyxZQUFZLEVBQzFCLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFDekMsYUFBYSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUN2RCxTQUFTLEVBQUUsU0FBUyxFQUNwQixJQUFJLEVBQUMsUUFBUSxJQUVaLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FDckUsQ0FDTixDQUNKLENBQ0osQ0FDSCxDQUNYLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFoSEQsZ0NBZ0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMsIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG5pbXBvcnQge1xuICAgIFRleHQsIFRvdWNoYWJsZU9wYWNpdHksIFZpZXcsIE1vZGFsLFxufSBmcm9tICdyZWFjdC1uYXRpdmUnO1xuaW1wb3J0IHsgUGlja2VyIH0gZnJvbSAnQHJlYWN0LW5hdGl2ZS1waWNrZXIvcGlja2VyJztcblxuaW1wb3J0IENvdW50cnkgZnJvbSAnLi9jb3VudHJ5JztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMnO1xuaW1wb3J0IHsgUmVhY3ROYXRpdmVDb3VudHJ5UGlja2VyUHJvcHMsIFJlYWN0TmF0aXZlQ291bnRyeVBpY2tlclN0YXRlIH0gZnJvbSAnLi90eXBpbmdzJztcblxuY29uc3QgUGlja2VySXRlbSA9IFBpY2tlci5JdGVtO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3VudHJ5UGlja2VyIGV4dGVuZHMgQ29tcG9uZW50PFJlYWN0TmF0aXZlQ291bnRyeVBpY2tlclByb3BzLCBSZWFjdE5hdGl2ZUNvdW50cnlQaWNrZXJTdGF0ZT4ge1xuICAgIHByaXZhdGUgcGlja2VyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGJ1dHRvbkNvbG9yOiB0aGlzLnByb3BzLmJ1dHRvbkNvbG9yIHx8ICcjMDA3QUZGJyxcbiAgICAgICAgICAgIG1vZGFsVmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBzZWxlY3RlZENvdW50cnk6IHRoaXMucHJvcHMuc2VsZWN0ZWRDb3VudHJ5IHx8IENvdW50cnkuZ2V0QWxsKClbMF0sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2VsZWN0Q291bnRyeShzZWxlY3RlZENvdW50cnkpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZENvdW50cnksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uUHJlc3NDYW5jZWwgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uUHJlc3NDYW5jZWwpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25QcmVzc0NhbmNlbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtb2RhbFZpc2libGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblByZXNzU3VibWl0ID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblByZXNzQ29uZmlybSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblByZXNzQ29uZmlybSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWJtaXQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQodGhpcy5zdGF0ZS5zZWxlY3RlZENvdW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtb2RhbFZpc2libGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblZhbHVlQ2hhbmdlID0gKHNlbGVjdGVkQ291bnRyeSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtb2RhbFZpc2libGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgcmVuZGVySXRlbShjb3VudHJ5LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gPFBpY2tlckl0ZW0ga2V5PXtjb3VudHJ5LmlzbzJ9IHZhbHVlPXtjb3VudHJ5LmlzbzJ9IGxhYmVsPXtjb3VudHJ5Lm5hbWV9IC8+O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBidXR0b25Db2xvciB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaXRlbVN0eWxlID0gdGhpcy5wcm9wcy5pdGVtU3R5bGUgfHwge307XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TW9kYWxcbiAgICAgICAgICAgICAgICBhbmltYXRpb25UeXBlPVwic2xpZGVcIlxuICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50XG4gICAgICAgICAgICAgICAgdmlzaWJsZT17dGhpcy5zdGF0ZS5tb2RhbFZpc2libGV9XG4gICAgICAgICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvdW50cnkgcGlja2VyIGhhcyBiZWVuIGNsb3NlZC4nKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxWaWV3IHN0eWxlPXtzdHlsZXMuYmFzaWNDb250YWluZXJ9PlxuICAgICAgICAgICAgICAgICAgICA8Vmlld1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXMubW9kYWxDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMucGlja2VyQmFja2dyb3VuZENvbG9yIHx8ICd3aGl0ZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IHN0eWxlPXtzdHlsZXMuYnV0dG9uVmlld30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRvdWNoYWJsZU9wYWNpdHkgb25QcmVzcz17dGhpcy5vblByZXNzQ2FuY2VsfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e1t7IGNvbG9yOiBidXR0b25Db2xvciB9LCB0aGlzLnByb3BzLmNhbmNlbFRleHRTdHlsZV19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2FuY2VsVGV4dCB8fCAnQ2FuY2VsJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVG91Y2hhYmxlT3BhY2l0eT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUb3VjaGFibGVPcGFjaXR5IG9uUHJlc3M9e3RoaXMub25QcmVzc1N1Ym1pdH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXtbeyBjb2xvcjogYnV0dG9uQ29sb3IgfSwgdGhpcy5wcm9wcy5jb25maXJtVGV4dFN0eWxlXX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jb25maXJtVGV4dCB8fCAnQ29uZmlybSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RvdWNoYWJsZU9wYWNpdHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxWaWV3IHN0eWxlPXtzdHlsZXMubWFpbkJveH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBpY2tlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9eyhyZWYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyID0gcmVmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLmJvdHRvbVBpY2tlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3RlZENvdW50cnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9eyhjb3VudHJ5KSA9PiB0aGlzLm9uVmFsdWVDaGFuZ2UoY291bnRyeSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1TdHlsZT17aXRlbVN0eWxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlPVwiZGlhbG9nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtDb3VudHJ5LmdldEFsbCgpLm1hcCgoY291bnRyeSwgaW5kZXgpID0+IHRoaXMucmVuZGVySXRlbShjb3VudHJ5LCBpbmRleCkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUGlja2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICAgICAgICAgICA8L1ZpZXc+XG4gICAgICAgICAgICAgICAgPC9WaWV3PlxuICAgICAgICAgICAgPC9Nb2RhbD5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=