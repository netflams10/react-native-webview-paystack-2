//
//  ReactnativePaystack2Module.swift
//  ReactnativePaystack2Module
//
//  Copyright © 2022 segun opeyemi. All rights reserved.
//

import Foundation

@objc(ReactnativePaystack2Module)
class ReactnativePaystack2Module: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
