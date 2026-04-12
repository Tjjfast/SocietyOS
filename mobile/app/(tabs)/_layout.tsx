import { Tabs } from 'expo-router';
import React from 'react';
import { BlurView } from 'expo-blur';
import { StyleSheet, Platform } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { Icon } from '@/components/ui/Icon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: '#dbe5ff',
        tabBarInactiveTintColor: '#9babce',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 10,
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
          borderRadius: 20,
        },
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.05)',
          elevation: 0,
          height: Platform.OS === 'ios' ? 88 : 72,
          paddingBottom: Platform.OS === 'ios' ? 24 : 12,
          paddingTop: 8,
          backgroundColor: 'transparent', // Let blur view show through
        },
        tabBarBackground: () => (
          <BlurView 
            intensity={40} 
            tint="dark" 
            style={StyleSheet.absoluteFill} 
            className="rounded-t-[20px] overflow-hidden" 
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon size={24} name={focused ? 'home' : 'house'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Icon size={24} name="explore" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
