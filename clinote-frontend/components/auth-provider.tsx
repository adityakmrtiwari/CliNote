'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { apiService, type User } from '@/lib/api';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const refreshUser = useCallback(async () => {
        try {
            const storedUser = apiService.getCurrentUser();
            if (!storedUser?.token) {
                setUser(null);
                setIsAuthenticated(false);
                return;
            }

            // Optimistically set user from storage first
            // Only update if user has changed to avoid re-renders
            setUser(prev => {
                if (JSON.stringify(prev) === JSON.stringify(storedUser)) {
                    return prev;
                }
                return storedUser;
            });
            setIsAuthenticated(true);

            // Then validate with API
            try {
                const profile = await apiService.getProfile();
                if (profile?.data) {
                    const profileData = profile.data;
                    setUser(prev => {
                        if (JSON.stringify(prev) === JSON.stringify(profileData)) {
                            return prev;
                        }
                        return profileData;
                    });
                    setIsAuthenticated(true);
                } else {
                    // Token invalid
                    apiService.logout();
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Auth validation failed:', error);
                // Don't logout immediately on network error
            }
        } catch (error) {
            console.error('Error checking auth:', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const login = useCallback((userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
        // apiService.login/register already sets localStorage, but we ensure it here if needed
        // or rely on the fact that the caller called apiService.login which sets it.
        // For safety, let's make sure apiService has it or we just update state.
        // Ideally apiService manages storage, we manage React state.
    }, []);

    const logout = useCallback(() => {
        apiService.logout();
        setUser(null);
        setIsAuthenticated(false);
        router.push('/login');
    }, [router]);

    // Protect routes
    useEffect(() => {
        const publicPaths = ['/login', '/register', '/', '/about', '/privacy', '/terms'];
        if (!isLoading && !isAuthenticated && !publicPaths.includes(pathname)) {
            // router.push('/login'); // Optional: Auto-redirect
        }
    }, [isLoading, isAuthenticated, pathname, router]);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
