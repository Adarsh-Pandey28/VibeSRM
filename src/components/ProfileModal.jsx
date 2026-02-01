import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    Sparkles, 
    MapPin, 
    Clock, 
    Calendar, 
    Trophy, 
    Zap, 
    Heart, 
    Star,
    BookOpen,
    Dumbbell,
    Music,
    Gamepad2,
    Code,
    Users,
    TrendingUp,
    Award,
    Camera,
    Edit3,
    Check,
    ChevronRight
} from 'lucide-react';
import { cn, YEAR_OPTIONS, INTEREST_OPTIONS } from '../utils/constants';

// Interest icons mapping
const INTEREST_ICONS = {
    'Studying': BookOpen,
    'Sports': Trophy,
    'Gym': Dumbbell,
    'Badminton': Zap,
    'Gaming': Gamepad2,
    'Music': Music,
    'Coding': Code,
    'Events': Users,
    'Reading': BookOpen
};

// Interest colors mapping
const INTEREST_COLORS = {
    'Studying': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/40', glow: 'shadow-blue-500/20' },
    'Sports': { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/40', glow: 'shadow-orange-500/20' },
    'Gym': { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/40', glow: 'shadow-rose-500/20' },
    'Badminton': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/40', glow: 'shadow-green-500/20' },
    'Gaming': { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/40', glow: 'shadow-purple-500/20' },
    'Music': { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/40', glow: 'shadow-pink-500/20' },
    'Coding': { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/40', glow: 'shadow-cyan-500/20' },
    'Events': { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/40', glow: 'shadow-amber-500/20' },
    'Reading': { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/40', glow: 'shadow-indigo-500/20' }
};

// Animated background particles
const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: Math.random() * 100 + '%',
                    scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                    y: [null, '-20%', '120%'],
                    opacity: [0, 1, 0]
                }}
                transition={{ 
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5
                }}
            />
        ))}
    </div>
);

// Stat card component
const StatCard = ({ icon: Icon, label, value, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        className={cn(
            "relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm",
            "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
            "group cursor-default"
        )}
    >
        <div className={cn("absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300", color)} />
        <div className="relative flex items-center gap-3">
            <div className={cn("p-2 rounded-xl", color)}>
                <Icon className="w-4 h-4" />
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">{label}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
            </div>
        </div>
    </motion.div>
);

// Level progress bar
const LevelProgress = ({ level, xp, maxXp }) => {
    const progress = (xp / maxXp) * 100;
    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">Level {level}</span>
                <span className="text-xs text-gray-500">{xp}/{maxXp} XP</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                    className="h-full bg-gradient-to-r from-vibe-purple via-vibe-cyan to-vibe-purple bg-[length:200%_100%]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%`, backgroundPosition: ['0% 0%', '100% 0%'] }}
                    transition={{ 
                        width: { duration: 1, ease: "easeOut" },
                        backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
                    }}
                />
            </div>
        </div>
    );
};

// Badge component
const Badge = ({ icon: Icon, label, unlocked, rarity }) => {
    const rarityColors = {
        common: 'from-gray-500 to-gray-600',
        rare: 'from-blue-500 to-cyan-500',
        epic: 'from-purple-500 to-pink-500',
        legendary: 'from-amber-500 to-orange-500'
    };
    
    return (
        <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={cn(
                "relative p-3 rounded-xl border transition-all duration-300",
                unlocked 
                    ? `bg-gradient-to-br ${rarityColors[rarity]} border-white/20 shadow-lg` 
                    : "bg-white/5 border-white/10 opacity-40"
            )}
        >
            <Icon className={cn("w-5 h-5", unlocked ? "text-white" : "text-gray-500")} />
            {unlocked && (
                <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0A0F]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                />
            )}
        </motion.div>
    );
};

export const ProfileModal = ({ isOpen, onClose, currentUser, onSave, userStats }) => {
    const [fullName, setFullName] = useState(currentUser?.full_name || currentUser?.fullName || '');
    const [yearOfStudy, setYearOfStudy] = useState(currentUser?.year_of_study || '');
    const [interests, setInterests] = useState(currentUser?.interests || []);
    const [freeTime, setFreeTime] = useState(currentUser?.free_time || '');
    const [bio, setBio] = useState(currentUser?.bio || '');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [viewMode, setViewMode] = useState('flashcard');
    const [isFlipped, setIsFlipped] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');

    // Mock stats (replace with real data)
    const stats = useMemo(() => ({
        level: userStats?.level || 12,
        xp: userStats?.xp || 2450,
        maxXp: userStats?.maxXp || 3000,
        checkins: userStats?.totalCheckins || 47,
        streak: userStats?.currentStreak || 5,
        eventsAttended: userStats?.eventsAttended || 12,
        friendsCount: userStats?.friendsCount || 24,
        hoursOnCampus: userStats?.hoursOnCampus || 156
    }), [userStats]);

    // Mock badges
    const badges = [
        { icon: Trophy, label: 'First Check-in', unlocked: true, rarity: 'common' },
        { icon: Zap, label: 'Speed Demon', unlocked: true, rarity: 'rare' },
        { icon: Star, label: 'Popular', unlocked: true, rarity: 'epic' },
        { icon: Award, label: 'Legend', unlocked: false, rarity: 'legendary' },
        { icon: Heart, label: 'Friendly', unlocked: true, rarity: 'rare' },
        { icon: TrendingUp, label: 'Rising Star', unlocked: false, rarity: 'epic' }
    ];

    useEffect(() => {
        if (!isOpen) return;
        setFullName(currentUser?.full_name || currentUser?.fullName || '');
        setYearOfStudy(currentUser?.year_of_study || '');
        setInterests(currentUser?.interests || []);
        setFreeTime(currentUser?.free_time || '');
        setBio(currentUser?.bio || '');
        setError('');
        setViewMode('flashcard');
        setIsFlipped(false);
        setActiveSection('overview');
    }, [isOpen, currentUser]);

    if (!isOpen) return null;

    const toggleInterest = (label) => {
        setInterests((prev) =>
            prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
        );
    };

    const handleSubmit = async () => {
        setSaving(true);
        setError('');
        try {
            await onSave({
                full_name: fullName,
                year_of_study: yearOfStudy,
                interests,
                free_time: freeTime,
                bio
            });
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const displayName = fullName || currentUser?.username || 'Your Name';
    const avatarUrl = currentUser?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${currentUser?.username || currentUser?.email || 'guest'}`;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden"
                >
                    {/* Main Card */}
                    <div className="relative glass-card rounded-[2.5rem] border border-white/10 overflow-hidden">
                        <FloatingParticles />
                        
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-vibe-purple/20 via-transparent to-vibe-cyan/10 pointer-events-none" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-vibe-purple/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-vibe-cyan/10 rounded-full blur-3xl pointer-events-none" />

                        {/* Header */}
                        <div className="relative p-6 pb-0">
                            <div className="flex items-center justify-between">
                                <motion.div 
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <Sparkles className="w-5 h-5 text-vibe-purple" />
                                    <h3 className="text-xl font-display font-bold text-white">Profile</h3>
                                </motion.div>
                                <div className="flex items-center gap-2">
                                    {/* View Toggle */}
                                    <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/10">
                                        {['flashcard', 'edit'].map((mode) => (
                                            <button
                                                key={mode}
                                                onClick={() => setViewMode(mode)}
                                                className={cn(
                                                    "px-3 py-1.5 text-xs rounded-lg transition-all duration-300 capitalize",
                                                    viewMode === mode 
                                                        ? "bg-gradient-to-r from-vibe-purple to-vibe-cyan text-white shadow-lg" 
                                                        : "text-gray-400 hover:text-white"
                                                )}
                                            >
                                                {mode === 'edit' ? <Edit3 className="w-3 h-3" /> : mode}
                                            </button>
                                        ))}
                                    </div>
                                    <motion.button 
                                        onClick={onClose} 
                                        className="p-2 rounded-xl hover:bg-white/10 transition"
                                        whileHover={{ rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mx-6 mt-4 px-4 py-3 rounded-xl bg-vibe-rose/10 text-vibe-rose text-sm border border-vibe-rose/30"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Content */}
                        <div className="relative p-6 overflow-y-auto max-h-[calc(90vh-180px)] custom-scrollbar">
                            <AnimatePresence mode="wait">
                                {viewMode === 'flashcard' ? (
                                    <motion.div
                                        key="flashcard"
                                        initial={{ opacity: 0, rotateY: -90 }}
                                        animate={{ opacity: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, rotateY: 90 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-6"
                                    >
                                        {/* Profile Card Header */}
                                        <motion.div 
                                            className="relative rounded-[2rem] p-6 bg-gradient-to-br from-violet-600/30 via-[#0B0B14]/80 to-cyan-600/20 border border-white/15 shadow-[0_0_60px_rgba(124,58,237,0.2)] overflow-hidden"
                                            whileHover={{ scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            {/* Animated border */}
                                            <div className="absolute inset-0 rounded-[2rem] p-[1px] bg-gradient-to-r from-vibe-purple via-vibe-cyan to-vibe-purple bg-[length:200%_100%] animate-gradient-x opacity-50" />
                                            
                                            <div className="relative flex items-start gap-5">
                                                {/* Avatar */}
                                                <motion.div 
                                                    className="relative group"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/20 bg-white/5 shadow-xl shadow-vibe-purple/20">
                                                        <img
                                                            src={avatarUrl}
                                                            alt="User"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    {/* Level badge */}
                                                    <motion.div 
                                                        className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-vibe-purple to-vibe-cyan text-white text-xs font-bold shadow-lg border border-white/20"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.3, type: "spring" }}
                                                    >
                                                        Lv.{stats.level}
                                                    </motion.div>
                                                    {/* Online indicator */}
                                                    <motion.div 
                                                        className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0B0B14]"
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                </motion.div>

                                                {/* Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-2xl font-bold text-white">{displayName}</h4>
                                                        <motion.div
                                                            animate={{ rotate: [0, 10, -10, 0] }}
                                                            transition={{ duration: 0.5, delay: 0.5 }}
                                                        >
                                                            <Sparkles className="w-5 h-5 text-amber-400" />
                                                        </motion.div>
                                                    </div>
                                                    <p className="text-sm text-gray-400 mt-1">{yearOfStudy || 'Year not set'}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">@{currentUser?.username || 'username'}</p>
                                                    
                                                    {/* Bio */}
                                                    <p className="mt-3 text-sm text-gray-300 line-clamp-2">
                                                        {bio || 'No bio yet. Click edit to add one!'}
                                                    </p>

                                                    {/* Quick stats row */}
                                                    <div className="flex items-center gap-4 mt-4">
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                            <MapPin className="w-3 h-3 text-vibe-cyan" />
                                                            <span>{stats.checkins} check-ins</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                            <Zap className="w-3 h-3 text-amber-400" />
                                                            <span>{stats.streak} day streak</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                            <Users className="w-3 h-3 text-vibe-purple" />
                                                            <span>{stats.friendsCount} friends</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Level Progress */}
                                            <div className="mt-6">
                                                <LevelProgress level={stats.level} xp={stats.xp} maxXp={stats.maxXp} />
                                            </div>
                                        </motion.div>

                                        {/* Section Tabs */}
                                        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
                                            {['overview', 'badges', 'activity'].map((section) => (
                                                <button
                                                    key={section}
                                                    onClick={() => setActiveSection(section)}
                                                    className={cn(
                                                        "flex-1 px-4 py-2 text-xs font-medium rounded-lg transition-all capitalize",
                                                        activeSection === section
                                                            ? "bg-white/10 text-white"
                                                            : "text-gray-400 hover:text-white"
                                                    )}
                                                >
                                                    {section}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Section Content */}
                                        <AnimatePresence mode="wait">
                                            {activeSection === 'overview' && (
                                                <motion.div
                                                    key="overview"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="space-y-4"
                                                >
                                                    {/* Stats Grid */}
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <StatCard icon={MapPin} label="Check-ins" value={stats.checkins} color="bg-vibe-cyan/10" delay={0.1} />
                                                        <StatCard icon={Calendar} label="Events" value={stats.eventsAttended} color="bg-vibe-purple/10" delay={0.2} />
                                                        <StatCard icon={Clock} label="Hours on Campus" value={`${stats.hoursOnCampus}h`} color="bg-amber-500/10" delay={0.3} />
                                                        <StatCard icon={TrendingUp} label="Current Streak" value={`${stats.streak} days`} color="bg-green-500/10" delay={0.4} />
                                                    </div>

                                                    {/* Interests */}
                                                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                                                                <Heart className="w-4 h-4 text-vibe-rose" />
                                                                Interests
                                                            </h5>
                                                            <span className="text-xs text-gray-500">{interests.length} selected</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {interests.length ? interests.map((label, i) => {
                                                                const Icon = INTEREST_ICONS[label] || Star;
                                                                const colors = INTEREST_COLORS[label] || INTEREST_COLORS['Studying'];
                                                                return (
                                                                    <motion.span 
                                                                        key={label} 
                                                                        className={cn(
                                                                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border shadow-sm",
                                                                            colors.bg, colors.text, colors.border, colors.glow
                                                                        )}
                                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{ delay: i * 0.05 }}
                                                                        whileHover={{ scale: 1.05 }}
                                                                    >
                                                                        <Icon className="w-3 h-3" />
                                                                        {label}
                                                                    </motion.span>
                                                                );
                                                            }) : (
                                                                <span className="text-sm text-gray-500">No interests yet. Click edit to add some!</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Free Time */}
                                                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                                                        <h5 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                                                            <Clock className="w-4 h-4 text-vibe-cyan" />
                                                            Usually free at
                                                        </h5>
                                                        <p className="text-sm text-gray-300">{freeTime || 'Not set'}</p>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {activeSection === 'badges' && (
                                                <motion.div
                                                    key="badges"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="bg-white/5 rounded-2xl p-5 border border-white/10"
                                                >
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                                                            <Award className="w-4 h-4 text-amber-400" />
                                                            Achievements
                                                        </h5>
                                                        <span className="text-xs text-gray-500">
                                                            {badges.filter(b => b.unlocked).length}/{badges.length} unlocked
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-6 gap-3">
                                                        {badges.map((badge, i) => (
                                                            <motion.div
                                                                key={badge.label}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: i * 0.1 }}
                                                            >
                                                                <Badge {...badge} />
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                    <p className="mt-4 text-xs text-gray-500 text-center">
                                                        Complete activities to unlock more badges!
                                                    </p>
                                                </motion.div>
                                            )}

                                            {activeSection === 'activity' && (
                                                <motion.div
                                                    key="activity"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="bg-white/5 rounded-2xl p-5 border border-white/10"
                                                >
                                                    <h5 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                                        Recent Activity
                                                    </h5>
                                                    <div className="space-y-3">
                                                        {[
                                                            { action: 'Checked in at Library', time: '2 hours ago', icon: MapPin, color: 'text-vibe-cyan' },
                                                            { action: 'Joined "Study Group" event', time: '1 day ago', icon: Users, color: 'text-vibe-purple' },
                                                            { action: 'Earned "Speed Demon" badge', time: '2 days ago', icon: Award, color: 'text-amber-400' },
                                                            { action: 'Checked in at Gym', time: '3 days ago', icon: Dumbbell, color: 'text-vibe-rose' }
                                                        ].map((item, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.1 }}
                                                            >
                                                                <div className={cn("p-2 rounded-lg bg-white/5", item.color)}>
                                                                    <item.icon className="w-4 h-4" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-sm text-white">{item.action}</p>
                                                                    <p className="text-xs text-gray-500">{item.time}</p>
                                                                </div>
                                                                <ChevronRight className="w-4 h-4 text-gray-500" />
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="edit"
                                        initial={{ opacity: 0, rotateY: 90 }}
                                        animate={{ opacity: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, rotateY: -90 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-5"
                                    >
                                        {/* Avatar Edit */}
                                        <div className="flex items-center gap-4">
                                            <div className="relative group">
                                                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 bg-white/5">
                                                    <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
                                                </div>
                                                <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-2xl transition">
                                                    <Camera className="w-6 h-6 text-white" />
                                                </button>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-400">Profile Picture</p>
                                                <p className="text-xs text-gray-500 mt-1">Click to change your avatar</p>
                                            </div>
                                        </div>

                                        {/* Name Input */}
                                        <div>
                                            <label className="text-sm text-gray-400 flex items-center gap-2">
                                                <Edit3 className="w-3 h-3" /> Name
                                            </label>
                                            <input
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="mt-2 w-full bg-white/5 rounded-xl px-4 py-3 text-white outline-none border border-white/10 focus:border-vibe-purple transition"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        {/* Bio Input */}
                                        <div>
                                            <label className="text-sm text-gray-400 flex items-center gap-2">
                                                <Edit3 className="w-3 h-3" /> Bio
                                            </label>
                                            <textarea
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                                className="mt-2 w-full bg-white/5 rounded-xl px-4 py-3 text-white outline-none border border-white/10 focus:border-vibe-purple transition resize-none h-20"
                                                placeholder="Tell others about yourself..."
                                                maxLength={150}
                                            />
                                            <p className="text-xs text-gray-500 mt-1 text-right">{bio.length}/150</p>
                                        </div>

                                        {/* Year Select */}
                                        <div>
                                            <label className="text-sm text-gray-400 flex items-center gap-2">
                                                <Calendar className="w-3 h-3" /> Year of study
                                            </label>
                                            <select
                                                value={yearOfStudy}
                                                onChange={(e) => setYearOfStudy(e.target.value)}
                                                className="mt-2 w-full bg-white/5 rounded-xl px-4 py-3 text-white outline-none border border-white/10 focus:border-vibe-purple transition"
                                            >
                                                <option value="" className="bg-[#0A0A0F]">Select year</option>
                                                {YEAR_OPTIONS.map((y) => (
                                                    <option key={y} value={y} className="bg-[#0A0A0F]">{y}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Interests */}
                                        <div>
                                            <label className="text-sm text-gray-400 flex items-center gap-2">
                                                <Heart className="w-3 h-3" /> Interests
                                            </label>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {INTEREST_OPTIONS.map((label) => {
                                                    const active = interests.includes(label);
                                                    const Icon = INTEREST_ICONS[label] || Star;
                                                    const colors = INTEREST_COLORS[label] || INTEREST_COLORS['Studying'];
                                                    return (
                                                        <motion.button
                                                            key={label}
                                                            onClick={() => toggleInterest(label)}
                                                            className={cn(
                                                                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all",
                                                                active
                                                                    ? cn(colors.bg, colors.text, colors.border, "shadow-md", colors.glow)
                                                                    : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20"
                                                            )}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Icon className="w-3.5 h-3.5" />
                                                            {label}
                                                            {active && <Check className="w-3 h-3 ml-1" />}
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Free Time */}
                                        <div>
                                            <label className="text-sm text-gray-400 flex items-center gap-2">
                                                <Clock className="w-3 h-3" /> Usually free at
                                            </label>
                                            <input
                                                value={freeTime}
                                                onChange={(e) => setFreeTime(e.target.value)}
                                                className="mt-2 w-full bg-white/5 rounded-xl px-4 py-3 text-white outline-none border border-white/10 focus:border-vibe-purple transition"
                                                placeholder="e.g. Weekdays 6–8 PM"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="relative p-6 pt-4 border-t border-white/5">
                            <div className="flex justify-end gap-3">
                                <motion.button 
                                    onClick={onClose} 
                                    className="px-5 py-2.5 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition font-medium"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Close
                                </motion.button>
                                {viewMode === 'edit' && (
                                    <motion.button
                                        onClick={handleSubmit}
                                        disabled={saving}
                                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-vibe-purple to-vibe-cyan text-white font-semibold shadow-lg shadow-vibe-purple/30 disabled:opacity-60 flex items-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {saving ? (
                                            <>
                                                <motion.div
                                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
