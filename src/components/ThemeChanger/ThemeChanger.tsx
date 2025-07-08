import { useEffect, useRef, useState } from 'react';
import { Button, Drawer, Radio, Switch } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import './ThemeChanger.scss';
import { useTheming } from '../../hooks/Theme.hook';
import { ThemeChecked, ThemeIcon, ThemePreviewIcon } from '../Icons/HeaderIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from '../../stores/Store';
import { setLayout, LayoutMode, setLayoutOption } from '../../stores/layoutSlice';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SketchPicker } from "react-color";

const ThemeChanger = () => {
  const [themeCollapse, setThemeCollapse] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const layout = useSelector((state: AppState) => state.layout.mode);
  const currentColor = useSelector(
    (state: AppState) => state.layout.menuTextColor
  );
  const activeBgColor = useSelector((state: AppState) => state.layout.activeMenuBackgroundColor);
  const activeTextColor = useSelector((state: AppState) => state.layout.activeMenuTextColor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLayout(e.target.value as LayoutMode));
  };
  const [expanded, setExpanded] = useState(false);
  const backgroundColor = useSelector((state: AppState) => state.layout.menuBackgroundColor);
  const primaryIcon = useSelector((state: AppState) => state.layout.primaryMenuIconColor);
  const secondaryIcon = useSelector((state: AppState) => state.layout.secondaryMenuIconColor);
  // functionality for customize menu and handle background and color with active state
  type ColorType =
  | 'menuBackgroundColor'
  | 'menuTextColor'
  | 'activeMenuBackgroundColor'
  | 'activeMenuTextColor'
  | 'primaryMenuIconColor'
  | 'secondaryMenuIconColor';

  const handleColorChange = (type:ColorType, color: { hex: string }) => {
        dispatch(setLayoutOption({key:type,value:color.hex}));
  };

  return (
    <>
      <Button type="link" onClick={() => setThemeCollapse(true)}>
        <ThemeIcon bgColor="#CEE1FC" />
      </Button>
      <Drawer closable={false} placement="right" onClose={() => setThemeCollapse(false)} open={themeCollapse}>
        <div className="ThemeChanger">
          <div className="flex-container mb-4 theme-header">
            <h3 className="f-sbold mb-0 d-flex valign-center">
              <ThemeIcon />
              Theme settings
            </h3>
            <CloseCircleOutlined
              onClick={() => setThemeCollapse(false)}
              style={{ color: '#FF4646', fontSize: '20px' }}
            />
          </div>
          <div className="theme-change">
            <h3 className='mar-btm-15 f-sbold'>Theme</h3>
            <TempThemeChanger />
          </div>
          <div className="sider-change">
            <h3 className='mar-btm-15 cls-customize-title f-sbold'>Sidemenu bg color<Switch checked={expanded} onChange={setExpanded} /></h3>
            {
              !expanded ?
              <div className='mar-btm-15'><NavBgChanger /></div>:
            <div
              className={`content-wrapper ${expanded ? "open" : ""}`}
            >
              <div className="content-inner">
                <div className="cls-colorpicker-label">
                  <ColorPickerBox color={backgroundColor} onChange={(color) => handleColorChange('menuBackgroundColor', color)} />
                  <p>Background color</p>
                </div>
                <div className="cls-colorpicker-label">
                  <ColorPickerBox color={currentColor} onChange={(color) => handleColorChange('menuTextColor', color)} />
                  <p>Text color</p>
                </div>
                <div className="cls-colorpicker-label">
                  <ColorPickerBox color={activeBgColor} onChange={(color) => handleColorChange('activeMenuBackgroundColor', color)} />
                  <p>Active background color</p>
                </div>
                <div className="cls-colorpicker-label">
                  <ColorPickerBox color={activeTextColor} onChange={(color) => handleColorChange('activeMenuTextColor', color)} />
                  <p>Active text color</p>
                </div>
                <div className="cls-colorpicker-container">
                  <p className='f-sbold'>Menu icon color</p>
                  <div className="cls-colorpicker-label">
                    <ColorPickerBox color={primaryIcon} onChange={(color) => handleColorChange('primaryMenuIconColor', color)} />
                    <p>Primary</p>
                  </div>
                  <div className="cls-colorpicker-label">
                    <ColorPickerBox color={secondaryIcon} onChange={(color) => handleColorChange('secondaryMenuIconColor', color)} />
                    <p>Secondary</p>
                  </div>
                </div>
              </div>
            </div>
            }
          </div>
          <div className="notification flex-container">
            <h3 className="f-sbold">Notifications</h3>
            <Switch />
          </div>
          <div className="cls-menu-layout">
            <p>Menu layout</p>
            <div className="cls-menu-layout-container">
              <label className='cls-layout-label'>
                <input type="radio" value="vertical" checked={layout === 'vertical'} onChange={handleChange} />
                <div className="cls-vertical-menu">
                  <aside></aside>
                  <div className="cls-menu-container">
                    <div className="cls-menu-content"></div>
                    <div className="cls-menu-content"></div>
                    <div className="cls-menu-content"></div>
                  </div>
                  <ThemeChecked />
                </div>
              </label>
              <label className='cls-layout-label'>
                <input type="radio" value="horizontal" checked={layout === 'horizontal'} onChange={handleChange} />
                <div className="cls-horizontal-menu">
                  <header></header>
                  <div className="cls-menu-container">
                    <div className="cls-menu-content"></div>
                    <div className="cls-menu-content"></div>
                    <div className="cls-menu-content"></div>
                  </div>
                  <ThemeChecked />
                </div>
              </label>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

const ColorPickerBox = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: { hex: string }) => void;
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [inputColor, setInputColor] = useState(color);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update input when Redux color changes externally
  useEffect(() => {
    setInputColor(color);
  }, [color]);

  // Validate and apply text input color
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputColor(value);

    const isValidHex = /^#([0-9A-Fa-f]{6})$/.test(value);
    if (isValidHex) {
      onChange({ hex: value });
    }
  };

  return (
    <div className="color-picker-container" ref={pickerRef}>
      <div
        className="color-preview-box"
        style={{ backgroundColor: color }}
        onClick={() => setShowPicker((prev) => !prev)}
      />
      {showPicker && (
        <div className="color-picker-dropdown">
          <SketchPicker
            color={color}
            onChange={(updatedColor: { hex: any; }) => {
              onChange(updatedColor);
              setInputColor(updatedColor.hex);
            }}
          />
        </div>
      )}
      <input
        className="color-input-box"
        type="text"
        value={inputColor}
        onChange={handleTextChange}
        placeholder="#RRGGBB"
        maxLength={7}
      />
    </div>
  );
};


// const ColorPickerBox = ({
//   color,
//   onChange,
// }: {
//   color: string;
//   onChange: (color: { hex: string }) => void;
// }) => {
//   const [showPicker, setShowPicker] = useState(false);
//   const pickerRef = useRef<HTMLDivElement>(null);

//   // Close picker when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
//         setShowPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="color-picker-container" ref={pickerRef}>
//       <div
//         className="color-preview-box"
//         style={{ backgroundColor: color }}
//         onClick={() => setShowPicker((prev) => !prev)}
//       />
//       {showPicker && (
//         <div className="color-picker-dropdown">
//           <SketchPicker color={color} onChange={onChange} />
//         </div>
//       )}
//     </div>
//   );
// };

const TempThemeChanger = () => {
  const { changeTheme, theme } = useTheming();
  return (
    <Radio.Group
      onChange={(e: RadioChangeEvent) => {
        if (e.target.value === 'light') {
          changeTheme('light');
        } else if (e.target.value === 'dark') {
          changeTheme('dark');
        }
      }}
      value={theme}
    >
      <Radio.Button value="light">
        <ThemePreviewIcon color="#CDDDF5" />
        <span className="checked-icon">
          <ThemeChecked />
        </span>
      </Radio.Button>
      <Radio.Button className="dark" value="dark">
        <ThemePreviewIcon color="#4B5284" />
        <span className="checked-icon">
          <ThemeChecked />
        </span>
      </Radio.Button>
    </Radio.Group>
  );
};

const NavBgChanger = () => {
  const [navBg, setNavBg] = useState('navlight');
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(setLayoutOption({key:"menuBackgroundColor",value:'#ffffff'}));
    dispatch(setLayoutOption({key:"menuTextColor",value:'#000000'}));
    dispatch(setLayoutOption({key:"activeMenuBackgroundColor",value:"#0c28a8"}));
    dispatch(setLayoutOption({key:"activeMenuTextColor",value:"#ffffff"}));
    dispatch(setLayoutOption({key:"primaryMenuIconColor",value:"#0e2071"}));
    dispatch(setLayoutOption({key:"secondaryMenuIconColor",value:"#FD9646"}));
  },[])

  return (
    <Radio.Group
      value={navBg}
      className="NavBgChanger"
      onChange={(e: RadioChangeEvent) => {
        switch (e.target.value) {
          case 'navlight':
            dispatch(setLayoutOption({key:"menuBackgroundColor",value:'#ffffff'}));
            dispatch(setLayoutOption({key:"menuTextColor",value:'#000000'}));
            setNavBg('navlight');
            // console.log('light');
            break;
          case 'navdark':
            dispatch(setLayoutOption({key:"menuBackgroundColor",value:'#708090'}));
            dispatch(setLayoutOption({key:"menuTextColor",value:'#ffffff'}));
            setNavBg('navdark');
            // console.log('navdark');
            break;
        }
      }}
    >
      <Radio.Button className="navlight" value="navlight">
        <span className="checked-icon">
          <ThemeChecked />
        </span>
      </Radio.Button>
      <Radio.Button className="navdark" value="navdark">
        <span className="checked-icon">
          <ThemeChecked />
        </span>
      </Radio.Button>
    </Radio.Group>
  );
};
export { ThemeChanger };
