import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 2 // Start with Create Story (middle tab)
    @State private var isLoading = true

    private let baseURL = "https://rtimage.vercel.app"

    private var currentURL: URL {
        switch selectedTab {
        case 0:
            return URL(string: "\(baseURL)/dashboard")!
        case 1:
            return URL(string: "\(baseURL)/storyboard")!
        case 2:
            return URL(string: "\(baseURL)/create")!
        case 3:
            return URL(string: "\(baseURL)/profile")!
        case 4:
            return URL(string: "\(baseURL)/settings")!
        default:
            return URL(string: "\(baseURL)/signup")!
        }
    }

    var body: some View {
        ZStack {
            VStack(spacing: 0) {
                // Main WebView Content
                ZStack {
                    WebView(url: currentURL, isLoading: $isLoading)
                        .ignoresSafeArea(edges: .top)

                    if isLoading {
                        ProgressView()
                            .scaleEffect(1.5)
                            .progressViewStyle(CircularProgressViewStyle(tint: .purple))
                            .frame(maxWidth: .infinity, maxHeight: .infinity)
                            .background(Color.white)
                    }
                }

                // Bottom Dock Navigation
                HStack(spacing: 0) {
                    // Dashboard
                    DockButton(
                        icon: "house.fill",
                        label: "Dashboard",
                        isSelected: selectedTab == 0,
                        action: { selectedTab = 0 }
                    )

                    // Storyboard
                    DockButton(
                        icon: "square.grid.2x2.fill",
                        label: "Storyboard",
                        isSelected: selectedTab == 1,
                        action: { selectedTab = 1 }
                    )

                    // Create Story (Middle)
                    DockButton(
                        icon: "plus.circle.fill",
                        label: "Create",
                        isSelected: selectedTab == 2,
                        action: { selectedTab = 2 }
                    )

                    // Profile
                    DockButton(
                        icon: "person.fill",
                        label: "Profile",
                        isSelected: selectedTab == 3,
                        action: { selectedTab = 3 }
                    )

                    // Settings
                    DockButton(
                        icon: "gearshape.fill",
                        label: "Settings",
                        isSelected: selectedTab == 4,
                        action: { selectedTab = 4 }
                    )
                }
                .frame(height: 80)
                .background(Color.white)
                .shadow(color: Color.black.opacity(0.1), radius: 10, x: 0, y: -5)
            }
            .ignoresSafeArea(edges: .bottom)
        }
    }
}

struct DockButton: View {
    let icon: String
    let label: String
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 24))
                    .foregroundColor(isSelected ? .purple : .gray)

                Text(label)
                    .font(.system(size: 10))
                    .foregroundColor(isSelected ? .purple : .gray)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 8)
        }
    }
}

#Preview {
    ContentView()
}
